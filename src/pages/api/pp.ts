import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const pp = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        console.log(req.method)
        console.log(req.body);
        console.log(req.query);

        res.status(201).json(true);

    } catch (err: any) {
        console.error(err.response?.data)
        res.status(500).json({ error: err?.message || "Error occured." });
    }

};
export default pp
