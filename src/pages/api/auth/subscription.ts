import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma'
import withSession from "@/middlewares/with-session";

const subscription_ = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        //@ts-ignore
        const id = req.user.id
        if (req.method === "POST") {
            const { date, expiry, type } = req.body;
            if (!date || !expiry)
                return res.status(400).json({ error: "Invalid data" });

            const setting = await prisma.setting.findFirst({ where: { v: 0 } })
            if (!setting)
                return res.status(400).json({ error: "Invalid settings" });
            const subscription = await prisma.subscription.findFirst({
                where: {
                    userId: id, isAutoRenew: true, isCanceled: false,
                    date: { lte: new Date() },
                    expiry: { gte: new Date() }
                },
            });
            if (subscription)
                res.status(400).json({ error: "Already has an Active subscription" });

            //verify payment
            const amount = setting!.amountMonth
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
                    type,
                    isManual: true,
                    isAutoRenew: true,
                    date: new Date(date),
                    expiry: new Date(expiry),
                }
            });

            if (user?.referredByUser && user?.referredByUser?.status === "active") {
                const p = amount * (setting.gen_1_p / 100)
                await prisma.payLog.create({
                    data: {
                        user: { connect: { id: user?.referredByUser.id } }, date: new Date(), amount: p, type: "EARN",
                        fromUserId: id, details: `${setting.gen_1_p}%`
                    }
                });
                await prisma.user.update({
                    where: { id: user?.referredByUser.id },
                    data: {
                        balance: { increment: p }
                    }
                });

            }
            if (user?.referredByUser?.referredByUser && user?.referredByUser?.referredByUser?.status === "active") {
                const p = amount * (setting.gen_2_p / 100)
                await prisma.payLog.create({
                    data: {
                        user: { connect: { id: user?.referredByUser?.referredByUser?.id } }, date: new Date(), amount: p, type: "EARN",
                        fromUserId: id, details: `${setting.gen_2_p}%`
                    }
                });
                await prisma.user.update({
                    where: { id: user?.referredByUser.referredByUser.id },
                    data: {
                        balance: { increment: p }
                    }
                });
            }
            if (user?.referredByUser?.referredByUser?.referredByUser && user?.referredByUser?.referredByUser?.referredByUser?.status === "active") {
                const p = amount * (setting.gen_3_p / 100)
                await prisma.payLog.create({
                    data: {
                        user: { connect: { id: user?.referredByUser.referredByUser.referredByUser.id } }, date: new Date(), amount: p, type: "EARN",
                        fromUserId: id, details: `${setting.gen_3_p}%`
                    }
                });
                await prisma.user.update({
                    where: { id: user?.referredByUser.referredByUser.referredByUser.id },
                    data: {
                        balance: { increment: p }
                    }
                });
            }

            res.status(201).json(null);
        } if (req.method === "DELETE") {
            const user = await prisma.user.findUnique({
                where: { id }, select: {
                    status: true, id: true
                }
            });
            const subscription = await prisma.subscription.findFirst({
                where: {
                    userId: id, isAutoRenew: true, isCanceled: false,
                    date: { lte: new Date() },
                    expiry: { gte: new Date() }
                },
            });
            if (!subscription)
                res.status(400).json({ error: "No active subscription" });

            await prisma.subscription.updateMany({
                where: {
                    userId: id, isAutoRenew: true, isCanceled: false, date: { lte: new Date() },
                    expiry: { gte: new Date() }
                }, data: { isAutoRenew: false }
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