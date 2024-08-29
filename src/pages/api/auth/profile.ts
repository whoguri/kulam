import withSession from "@/middlewares/with-session";
import { USER_SELECT } from "../../../../prisma/select";
import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const profile = async (req: NextApiRequest, res: NextApiResponse) => {
    const data = req.body;
    //@ts-ignore
    const id = req.user.id
    try {
        if (req.method === "PUT") {
            if (data.email) {
                const user = await prisma.user.findFirst({ where: { email: data.email, id: { not: id } } });
                if (user)
                    return res.status(400).json({ error: "User already exists with same email" });
            }
            const newData: any = {}
            Object.entries(data).forEach(item => {
                newData[item[0]] = item[1]
            })

            const result = await prisma.user.update({ where: { "id": id }, data: newData });
            // if (result && result.password)
            //     delete result.password

            res.status(200).json(result);
        } else {
            const result = await prisma.user.findUnique({ where: { "id": id }, select: USER_SELECT });
            const tree = await getReferralTree(id);

            res.status(200).json({ ...result, tree: tree.referrals });
        }
    } catch (err: any) {
        console.error(err)
        res.status(403).json({ error: err?.message || "Error occured." });
    }

};

async function getReferralTree(userId: string) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            referrals: true,
        },
    });

    if (!user) return null;

    const tree: any = {
        id: user.id,
        name: user.name,
        email: user.email,
        referrals: await Promise.all(user.referrals.map(ref => getReferralTree(ref.id))),
    };

    return tree;
}

export default withSession(profile)
