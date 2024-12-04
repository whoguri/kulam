import prisma from "@/lib/prisma";
import withAdmin from "@/middlewares/with-admin";
import { NextApiRequest, NextApiResponse } from "next";

const settings = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === "PUT") {
            const { amountMonth, amountYear, gen_1, gen_2, gen_3, gen_1_p, gen_2_p, gen_3_p }: any = req.body;
            await prisma.setting.upsert({
                where: { v: 0 },
                update: { amountYear, amountMonth, gen_1, gen_2, gen_3, gen_1_p, gen_2_p, gen_3_p },
                create: { amountYear, amountMonth, gen_1, gen_2, gen_3, v: 0, gen_1_p, gen_2_p, gen_3_p }
            });
            res.status(201).json(null);
        } else if (req.method === "GET") {
            const result = await prisma.setting.findFirst({ where: { v: 0 } });
            res.status(200).json(result);
        } else {
            res.status(404).json(null);
        }
    } catch (err: any) {
        console.error(err)
        res.status(500).json({ error: err?.message || "Error occured." });
    }

};
export default withAdmin(settings)
