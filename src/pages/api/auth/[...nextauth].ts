import NextAuth from "next-auth";
import { PrismaClient } from "@prisma/client";
// import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
// import bcrypt from 'bcrypt';
import { PrismaAdapter } from "@auth/prisma-adapter";

const prisma = new PrismaClient();

export default NextAuth({
    //@ts-ignore
    adapter: PrismaAdapter(),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        }),
        // CredentialsProvider({
        //     name: "Credentials",
        //     credentials: {
        //         email: { label: "email", type: "text", placeholder: "email" },
        //         password: { label: "Password", type: "password", placeholder: "password" }
        //     },
        //     async authorize(credentials, req) {
        //         const { email, password }: any = credentials
        //         const user = await prisma.user.findUnique({ where: { email }, include: { publishers: true } })
        //         if (user) {
        //             const passwordMatch = await bcrypt.compare(password || "", user.password || "");
        //             if (!passwordMatch) {
        //                 throw new Error('Wrong email or password')
        //             }

        //             //@ts-ignore
        //             delete user.password
        //             if (user.status === "active") {
        //                 await prisma.user.update({ where: { email }, data: { lastLogin: new Date() } })
        //                 return user
        //             } else {
        //                 throw new Error('Account is inactive contact Admin')
        //             }
        //         }
        //         throw new Error('Wrong email or password')
        //     }
        // })
    ],
    callbacks: {
        async signIn({ account, profile, user }) {
            if (account?.provider === 'google') {
            }
            return true
        },
        async jwt({ token, user }) {
            return token
        },
        //@ts-ignore
        async session({ session, token, user }) {
            if (!token)
                return {}

            //@ts-ignore
            const u = await prisma.user.findFirst({ where: { email: token?.email }, include: { publishers: true } })
            if (!u || u.status !== "active")
                return {}

            //@ts-ignore
            delete u.password
            return { ...session, user: u }
        }
    },
    pages: {
        // signIn: "/login"
    },
    events: {
        async signIn(e) {
            const u_ = await prisma.user.findUnique({ where: { email: e?.user?.email || "" } })
            if (u_)
                await prisma.user.update({ where: { email: e?.user?.email || "" }, data: { lastLogin: new Date() } })
        },
        async createUser(e) {
            if (e?.user?.email) {
                const u_ = await prisma.user.findUnique({ where: { email: e?.user?.email || "" } })
                // if (u_ && !u_.password)
                //     await prisma.user.update({ where: { email: e?.user?.email }, data: { registerOn: new Date(), lastLogin: new Date(), loginType: "GOOGLE" } })
            }
        },
        async session(e) {
        },
    },
    logger: {
        error: (code, metadata) => {
            console.error(">>>>>Error", code, metadata);
        },
        warn: (code) => {
            console.warn(">>>>>code", code);
        },
        debug: (code, metadata) => {
        },
    },
    session: { strategy: "jwt", maxAge: 2592000, updateAge: 86400 },
    secret: process.env.NEXT_AUTH_SECRET,
    // jwt: { maxAge: 54000 }

});