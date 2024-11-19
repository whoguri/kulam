import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma'
import withSession from "@/middlewares/with-session";
import { randomBytes } from 'crypto';
import bcrypt from 'bcrypt';

const register = async (req: NextApiRequest, res: NextApiResponse) => {
    const data = req.body;
    try {
        if (req.method === "POST") {
            if (!data.phone || !data.password || !data.userName)
                return res.status(400).json({ error: "Phone is required" });

            const user = await prisma.user.findFirst({ where: { phone: data.phone } });
            if (user)
                return res.status(400).json({ error: "User already exists with same phone" });
            const user2 = await prisma.user.findFirst({ where: { phone: data.userName } });
            if (user2)
                return res.status(400).json({ error: "User already exists with same userName" });

            const hashedPassword = await bcrypt.hash(data.password, 10);
            data.password = hashedPassword
            data.registerOn = new Date()
            //@ts-ignore
            data.referredByUser = { connect: { id: req.user?.id } }
            data.role = "user"

            const code = randomBytes(4).toString('hex')
            data.referralCode = code

            data.loginType = "PASSWORD"
            const result = await prisma.user.create({ data });
            res.status(200).json(result);

        } else {
            res.status(404).json(null);
        }
    } catch (err: any) {
        console.error(err)
        res.status(403).json({ error: err?.message || "Error occured." });
    }
};
export default withSession(register)