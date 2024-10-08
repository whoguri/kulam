import prisma from '@/lib/prisma';
import withAdmin from '@/middlewares/with-admin';
import { NextApiRequest, NextApiResponse } from 'next';

const service = async (req: NextApiRequest, res: NextApiResponse) => {
    const data = req.body;
    try {
        if (req.method === "PUT") {
            const result = await prisma.appContent.upsert({
                where: { type: "SERVICES" },
                create: { type: "SERVICES", description: data.description, createdAt: new Date() }, update: { description: data.description }
            });
            res.status(200).json(result);
        } else {
            const result = await prisma.appContent.findFirst({ where: { type: "SERVICES" } });
            res.status(200).json(result);
        }
    } catch (err: any) {
        console.error(err)
        res.status(403).json({ error: err?.message || "Error occured." });
    }
};
export default withAdmin(service)