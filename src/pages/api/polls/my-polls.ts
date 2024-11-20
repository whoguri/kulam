import prisma from '@/lib/prisma';
import withSession from '@/middlewares/with-session';
import { NextApiRequest, NextApiResponse } from 'next';

const polls = async (req: NextApiRequest & { user?: any }, res: NextApiResponse) => {
    try {
        const result = await prisma.poll.findMany({
            where: {
                answer: { none: { userId: req.user.id } }
            },
            orderBy: { date: "desc" }, take: 10
        });
        res.status(200).json(result);
    } catch (err: any) {
        console.error(err)
        res.status(403).json({ error: err?.message || "Error occured." });
    }
};
export default withSession(polls)