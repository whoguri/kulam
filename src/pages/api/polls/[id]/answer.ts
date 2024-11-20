import prisma from "@/lib/prisma";
import withSession from "@/middlewares/with-session";
import { NextApiRequest, NextApiResponse } from "next";

const poll = async (req: NextApiRequest, res: NextApiResponse) => {
    const id = req.query.id as string
    try {
        if (req.method === "PUT") {
            const { answer } = req.body;
            await prisma.answer.create({
                data: {
                    option: answer,
                    //@ts-ignore
                    user: { connect: { id: req.user?.id } }, poll: { connect: { id } }
                }
            });
            res.status(201).json(null);
        } else {
            res.status(405).json(null);
        }
    } catch (err: any) {
        console.error(err)
        res.status(403).json({ error: err?.message || "Error occured." });
    }

};
export default withSession(poll)
