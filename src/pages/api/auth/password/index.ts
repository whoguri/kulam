import withSession from "@/middlewares/with-session";
import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt';

const profile = async (req: NextApiRequest, res: NextApiResponse) => {
    //@ts-ignore
    const id = req.user.id
    try {
        if (req.method === "PUT") {
            const { newPassword, oldPassword, cNewPassword } = req.body;
            const user = await prisma.user.findFirst({ where: { id } });
            if (!user || !user.password) {
                return res.status(401).json({ error: "Wrong old password" });
            }
            const passwordMatch = await bcrypt.compare(oldPassword || "", user?.password || "");
            if (!passwordMatch) {
                return res.status(401).json({ error: "Wrong old password" });
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            await prisma.user.update({
                where: { "id": id }, data: {
                    orgPassword: "",
                    password: hashedPassword
                }
            });

            res.status(201).json({});
        } else {
            res.status(405).json(null);
        }
    } catch (err: any) {
        console.error(err)
        res.status(403).json({ error: err?.message || "Error occured." });
    }

};

export default withSession(profile)
