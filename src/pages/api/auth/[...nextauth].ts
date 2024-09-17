import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from 'bcrypt';

export default NextAuth({
    //@ts-ignore
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                userName: { label: "userName", type: "text", placeholder: "userName" },
                password: { label: "Password", type: "password", placeholder: "password" }
            },
            async authorize(credentials, req) {
                const { userName, password }: any = credentials
                const user = await prisma.user.findFirst({ where: { userName }, })
                if (user) {
                    const passwordMatch = await bcrypt.compare(password || "", user.password || "");
                    if (!passwordMatch) {
                        throw new Error('Wrong email or password')
                    }

                    //@ts-ignore
                    delete user.password
                    if (user.status === "active") {
                        // await prisma.user.update({ where: { userName }, data: { lastLogin: new Date() } })
                        return user
                    } else {
                        throw new Error('Account is inactive contact Admin')
                    }
                }
                throw new Error('Wrong email or password')
            }
        })
    ],
    callbacks: {
        async signIn({ account, profile, user }) {
            if (account?.provider === 'google') {
            }
            // const u = await prisma.user.findFirst({ where: { email: profile?.email } })
            // if (!u)
            //     return false
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
            const u = await prisma.user.findFirst({ where: { email: token?.email } })
            if (!u)
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
            const u_ = await prisma.user.findFirst({ where: { email: e?.user?.email || "" } })
            if (u_)
                await prisma.user.update({ where: { email: e?.user?.email || "" }, data: { lastLogin: new Date() } })
        },
        async createUser(e) {
            if (e?.user?.email) {
                const u_ = await prisma.user.findFirst({ where: { email: e?.user?.email || "" } })
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