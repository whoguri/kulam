// import bcrypt from 'bcrypt';

import withSession from "@/middlewares/with-session";
import { USER_SELECT } from "../../../../prisma/select";

const profile = async (req, res) => {
    const data = req.body;
    const id = req.user.id
    try {
        if (req.method === "PUT") {
            if (data.email) {
                const user = await prisma.user.findFirst({ where: { email: data.email, id: { not: id } } });
                if (user)
                    return res.status(400).json({ error: "User already exists with same email" });
            }
            const newData = {}
            Object.entries(data).forEach(item => {
                newData[item[0]] = item[1]
            })

            const result = await prisma.user.update({ where: { "id": id }, data: newData });
            if (result && result.password)
                delete result.password

            res.status(200).json(result);
        } else {
            const result = await prisma.user.findUnique({
                where: { "id": id }, select: USER_SELECT
            });
            const tree = await getReferralTree(id);

            res.status(200).json({ ...result, tree });
        }
    } catch (err) {
        console.error(err)
        res.status(403).json({ error: err?.message || "Error occured." });
    }

};

async function getReferralTree(userId) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            referrals: true,
        },
    });

    if (!user) return null;

    const tree = {
        id: user.id,
        name: user.name,
        email: user.email,
        referrals: await Promise.all(user.referrals.map(ref => getReferralTree(ref.id))),
    };

    return tree;
}

export default withSession(profile)
