import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma'
import withSession from "@/middlewares/with-session";

const subscription_ = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === "POST") {
            const { date, expiry } = req.body;
            if (!date || !expiry)
                return res.status(400).json({ error: "Invalid data" });
            //@ts-ignore
            const id = req.user.id

            //verify payment
            const amount = 10
            const user = await prisma.user.findUnique({
                where: { id }, select: {
                    status: true, id: true,
                    referredByUser: {
                        select: {
                            status: true, id: true,
                            referredByUser: {
                                select: {
                                    status: true, id: true,
                                    referredByUser: {
                                        select: { status: true, id: true, }
                                    }
                                }
                            },
                        }
                    }
                }
            });
            await prisma.subscription.create({
                data: {
                    user: { connect: { id } },
                    amount,
                    date: new Date(date),
                    expiry: new Date(expiry),
                }
            });
            if (user?.referredByUser && user?.referredByUser?.status === "active") {
                await prisma.payLog.create({
                    data: {
                        user: { connect: { id: user?.referredByUser.id } }, date: new Date(), amount: amount / 10, type: "EARN",
                        fromUserId: id, details: `10%`
                    }
                });
                await prisma.user.update({
                    where: { id: user?.referredByUser.id },
                    data: {
                        balance: { increment: amount / 10 }
                    }
                });

            }
            if (user?.referredByUser?.referredByUser && user?.referredByUser?.referredByUser?.status === "active") {
                await prisma.payLog.create({
                    data: {
                        user: { connect: { id: user?.referredByUser?.referredByUser?.id } }, date: new Date(), amount: amount / 2, type: "EARN",
                        fromUserId: id, details: `2%`
                    }
                });
                await prisma.user.update({
                    where: { id: user?.referredByUser.referredByUser.id },
                    data: {
                        balance: { increment: amount / 2 }
                    }
                });
            }
            if (user?.referredByUser?.referredByUser?.referredByUser && user?.referredByUser?.referredByUser?.referredByUser?.status === "active") {
                await prisma.payLog.create({
                    data: {
                        user: { connect: { id: user?.referredByUser.referredByUser.referredByUser.id } }, date: new Date(), amount: amount / 1, type: "EARN",
                        fromUserId: id, details: `1%`
                    }
                });
                await prisma.user.update({
                    where: { id: user?.referredByUser.referredByUser.referredByUser.id },
                    data: {
                        balance: { increment: amount / 1 }
                    }
                });
            }


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