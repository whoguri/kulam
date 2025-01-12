import prisma from '@/lib/prisma';
import withSession from '@/middlewares/with-session';
import { NextApiRequest, NextApiResponse } from 'next';

const deals = async (req: NextApiRequest & { user?: any }, res: NextApiResponse) => {
    const data = req.body;
    try {
        const user = req?.user
        if (req.method === "POST") {
            if (!req.user)
                res.status(401).json({ error: "Unauthorized" });
            const result = await prisma.deal.create({ data });
            res.status(200).json(result);
        } else {
            const { limit, skip, name }: any = req.query
            const q: any = {
                where: {},
                // orderBy: { name: 'desc' },
            }
            if (user?.role === "advertiser") {
                q.where.advertiserId = user?.id
            }
            if (name) {
                q.where.name = { contains: name, mode: "insensitive" }
            }

            if (limit) q.take = parseInt(limit)
            if (skip) q.skip = parseInt(skip)

            const result = await prisma.deal.findMany(q);
            res.status(200).json(result);
        }
    } catch (err: any) {
        console.error(err)
        res.status(403).json({ error: err?.message || "Error occured." });
    }
};
export default withSession(deals)