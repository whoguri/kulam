import prisma from "@/lib/prisma";
import withAdmin from "@/middlewares/with-admin";
import { NextApiRequest, NextApiResponse } from "next";

const poll = async (req: NextApiRequest, res: NextApiResponse) => {
    const data = req.body;
    const id = req.query.id as string
    try {
        if (req.method === "PUT") {
            const result = await prisma.poll.update({ where: { "id": id }, data });
            res.status(200).json(result);
        } else if (req.method === "DELETE") {
            await prisma.poll.delete({ where: { "id": id } });
            res.status(200).json(null);
        } else {
            const result = await prisma.poll.findUnique({ where: { "id": id }, });
            res.status(200).json(result);
        }
    } catch (err: any) {
        console.error(err)
        res.status(403).json({ error: err?.message || "Error occured." });
    }

};
export default withAdmin(poll)
