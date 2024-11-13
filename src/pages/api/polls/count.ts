import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma'
import withSession from '@/middlewares/with-session';

const pollsCount = async (req: NextApiRequest & { user?: any }, res: NextApiResponse) => {
    try {
        const user = req?.user
        const isAdmin = user?.role === "admin"
        if (req.method === "GET") {
            const { name }: any = req.query
            const q: any = {
                where: {},
            }
            if (!isAdmin) {
                q.where.advertiserId = user.id
            }
            if (name) {
                q.where.name = { contains: name, mode: "insensitive" }
            }
            const result = await prisma.poll.count(q);
            res.status(200).json(result);
        } else {
            res.status(200).json(0);
        }
    } catch (err: any) {
        console.error(err)
        res.status(403).json({ error: err?.message || "Error occured." });
    }
};
export default withSession(pollsCount)