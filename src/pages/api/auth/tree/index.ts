import withSession from "@/middlewares/with-session";
import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const profile = async (req: NextApiRequest, res: NextApiResponse) => {
    //@ts-ignore
    const id = req.user.id
    try {
        const limit = 2
        const { page, s }: any = req.query
        // const tree = await getReferralTree(id, 1);

        const where: any = { referredBy: id, status: "active" }
        if (s) {
            where.OR = [{ email: { contains: s, mode: "insensitive" } },
            { phone: { contains: s, mode: "insensitive" } },
            { name: { contains: s, mode: "insensitive" } },
            { userName: { contains: s, mode: "insensitive" } }
            ]
        }
        const users = await prisma.user.findMany({
            where,
            take: limit,
            skip: parseInt(page || "0") * limit,
            orderBy: { registerOn: "desc" },
            select: {
                id: true,
                name: true,
                userName: true,
                email: true,
                phone: true,
                referrals: {
                    select: {
                        id: true,
                        name: true,
                        userName: true,
                        email: true,
                        phone: true,
                    }
                }
            }
        });

        res.status(200).json(users);
    } catch (err: any) {
        console.error(err)
        res.status(403).json({ error: err?.message || "Error occured." });
    }

};

export default withSession(profile)
