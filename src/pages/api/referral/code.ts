import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

const service = async (req: NextApiRequest, res: NextApiResponse) => {
    const id = req.query.code as string
    try {
        if (req.method === "GET") {
            const result = await prisma.user.findFirst({
                where: { referralCode: id },
                select: { name: true }
            });
            res.status(200).json(result);
        } else {
            res.status(405).json(null);
        }
    } catch (err: any) {
        console.error(err)
        res.status(403).json({ error: err?.message || "Error occured." });
    }
};
export default service