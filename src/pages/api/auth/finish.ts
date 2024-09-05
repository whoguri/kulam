import prisma from "@/lib/prisma";
import withSession from "@/middlewares/with-session";
import { NextApiRequest, NextApiResponse } from "next";
import { randomBytes } from 'crypto';

const finish = async (req: NextApiRequest, res: NextApiResponse) => {
    const data: any = req.body;
    //@ts-ignore
    const id = req.user.id
    try {
        if (req.method === "PUT") {
            if (!data.role)
                return res.status(400).json({ error: "Missing role" });
            const code = randomBytes(4).toString('hex')
            let ref = undefined
            if (data.referredBy) {
                const refUser = await prisma.user.findFirst({ where: { referralCode: data.referredBy } })
                if (!refUser)
                    return res.status(400).json({ error: "Wrong code" });
                ref = refUser.id
            }

            const result = await prisma.user.update({
                where: { "id": id }, data: {
                    role: data.role, referralCode: code,
                    referredByUser: !ref ? undefined : { connect: { id: ref } },
                    name: data.name,
                    phone: data.phone,
                    socialId: data.socialId,
                    city: data.city
                }
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
export default withSession(finish)
