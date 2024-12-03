import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma'
import withSession from "@/middlewares/with-session";
import { randomBytes } from 'crypto';
import bcrypt from 'bcrypt';

const subscription_ = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === "POST") {
            const { date, expiry } = req.body;
            if (!date || !expiry)
                return res.status(400).json({ error: "Invalid data" });
            //@ts-ignore
            const id = req.user.id

            //verify payment

            const user = await prisma.user.findUnique({ where: { id } });
            await prisma.subscription.create({
                data: {
                    user: { connect: { id } },
                    amount: 100,
                    date: new Date(date),
                    expiry: new Date(expiry),
                }
            });

            res.status(201).json(null);
        } else {
            res.status(404).json(null);
        }
    } catch (err: any) {
        console.error(err)
        res.status(403).json({ error: err?.message || "Error occured." });
    }
};
export default withSession(subscription_)