import prisma from "../../../lib/prisma";
import withSession from "../../../middlewares/with-session";
// import { USER_SELECT } from "../../../../prisma/select";
import bcrypt from 'bcrypt';

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
            if (newData.password) {
                const user = await prisma.user.findUnique({ where: { id } })
                if (!user || !user.password)
                    return res.status(401).json({ error: "No user found" });

                const passwordMatch = await bcrypt.compare(newData.oldPassword || "", user.password || "");
                if (!passwordMatch) {
                    return res.status(400).json({ error: "Wrong oldPassword" });
                }
                delete newData.oldPassword
                const hashedPassword = await bcrypt.hash(newData.password, 10);
                newData.password = hashedPassword
            } else {
                delete newData.password
                delete newData.oldPassword
            }
            const result = await prisma.user.update({ where: { "id": id }, data: newData });
            if (result && result.password)
                delete result.password

            res.status(200).json(result);
        } else {
            const result = await prisma.user.findUnique({
                where: { "id": id }, //select: USER_SELECT
            });
            res.status(200).json(result);
        }
    } catch (err) {
        console.error(err)
        res.status(403).json({ error: err?.message || "Error occured." });
    }

};
export default withSession(profile)
