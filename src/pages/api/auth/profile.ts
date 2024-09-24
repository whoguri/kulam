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
            if (data.userName) {
                const user = await prisma.user.findFirst({ where: { userName: data.userName, id: { not: id } } });
                if (user)
                    return res.status(400).json({ error: "User already exists with same user name" });
            }
            const newData: any = {}
            Object.entries(data).forEach(item => {
                if (["socialId", "phone", "city", "userName", "image", "name"].includes(item[0]))
                    newData[item[0]] = item[1]
            })

            const result = await prisma.user.update({ where: { "id": id }, data: newData });
            // if (result && result.password)
            //     delete result.password

            res.status(200).json(result);
        } else {
            const result = await prisma.user.findFirst({ where: { "id": id }, select: USER_SELECT });
            const tree = await getReferralTree(id, 1);

            res.status(200).json({ ...result, tree: tree.referrals });
        }
    } catch (err: any) {
        console.error(err)
        res.status(403).json({ error: err?.message || "Error occured." });
    }

};

async function getReferralTree(userId: string, n: number) {
    const user = await prisma.user.findFirst({
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
        referrals: n < 3 ? await Promise.all(user.referrals.map(ref => getReferralTree(ref.id, n + 1))) : [],
    };

    return tree;
}

export default withSession(profile)
