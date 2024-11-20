import { randomBytes } from 'crypto';
import prisma from '../../../lib/prisma'
import bcrypt from 'bcrypt';
import withSession from '@/middlewares/with-session';
import { NextApiRequest, NextApiResponse } from 'next';

const register = async (req: NextApiRequest, res: NextApiResponse) => {
    const data = req.body;
    try {
        if (req.method === "POST") {
            if (!data.password || !data.userName)
                return res.status(400).json({ error: "data is missing" });

            const user = await prisma.user.findFirst({ where: { userName: data.userName } });
            if (user)
                return res.status(400).json({ error: "User already exists with same userName" });

            const hashedPassword = await bcrypt.hash(data.password, 10);
            data.password = hashedPassword
            const code = randomBytes(4).toString('hex')
            data.referralCode = code
            //@ts-ignore
            const result = await prisma.user.update({ where: { id: req.user.id }, data });
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
