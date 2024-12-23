import prisma from '@/lib/prisma';
import withAdmin from '@/middlewares/with-admin';
import { NextApiRequest, NextApiResponse } from 'next';

const polls = async (req: NextApiRequest & { user?: any }, res: NextApiResponse) => {
    const data = req.body;
    try {
        if (req.method === "POST") {
            if (!req.user)
                res.status(401).json({ error: "Unauthorized" });
            const result = await prisma.poll.create({ data });
            res.status(200).json(result);
        } else {
            const { limit, skip, name }: any = req.query
            const q: any = {
                where: {},
                orderBy: { date: 'desc' },
                include: { answer: { select: { option: true } } }
            }

            if (name) {
                q.where.name = { contains: name, mode: "insensitive" }
            }

            if (limit) q.take = parseInt(limit)
            if (skip) q.skip = parseInt(skip)

            const result = await prisma.poll.findMany(q);
            res.status(200).json(result);
        }
    } catch (err: any) {
        console.error(err)
        res.status(403).json({ error: err?.message || "Error occured." });
    }
};
export default withAdmin(polls)