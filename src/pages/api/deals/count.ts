import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma'
import withSession from '@/middlewares/with-session';

const dealsCount = async (req: NextApiRequest & { user?: any }, res: NextApiResponse) => {
    try {
        const user = req?.user
        if (req.method === "GET") {
            const { name }: any = req.query
            const q: any = {
                where: {},
            }
            if (user?.role === "advertiser") {
                q.where.advertiserId = user.id
            }
            if (name) {
                q.where.name = { contains: name, mode: "insensitive" }
            }
            const result = await prisma.deal.count(q);
            res.status(200).json(result);
        } else {
            res.status(200).json(0);
        }
    } catch (err: any) {
        console.error(err)
        res.status(403).json({ error: err?.message || "Error occured." });
    }
};
export default withSession(dealsCount)