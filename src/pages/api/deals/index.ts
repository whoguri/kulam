import prisma from '@/lib/prisma';
import withSession from '@/middlewares/with-session';
import { NextApiRequest, NextApiResponse } from 'next';

const deals = async (req: NextApiRequest, res: NextApiResponse) => {
    const data = req.body;
    try {
        if (req.method === "POST") {
            const result = await prisma.deal.create({ data });
            res.status(200).json(result);
        } else {
            const { limit, skip, name }: any = req.query
            const q: any = {
                where: {},
                // orderBy: { name: 'desc' },
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