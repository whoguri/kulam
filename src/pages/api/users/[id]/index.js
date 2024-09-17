import prisma from "@/lib/prisma";
import withAdmin from "@/middlewares/with-admin";
import { USER_SELECT } from "../../../../../prisma/select";
// import bcrypt from 'bcrypt';

const user = async (req, res) => {
    const data = req.body;
    const id = req.query.id
    try {
        if (req.method === "PUT") {
            const user = await prisma.user.findFirst({ where: { email: data.email, id: { not: id } } });
            if (user)
                return res.status(400).json({ error: "User already exists with same email" });

            // if (data.password) {
            //     const hashedPassword = await bcrypt.hash(data.password, 10);
            //     data.password = hashedPassword
            // } else {
            //     delete data.password
            // }
            const result = await prisma.user.update({ where: { "id": id }, data });
            res.status(200).json(result);
        } else if (req.method === "DELETE") {
            await prisma.user.delete({ where: { "id": id } });
            res.status(200).json(null);
        } else {
            const result = await prisma.user.findFirst({
                where: { "id": id }, select: USER_SELECT
            });
            res.status(200).json(result);
        }
    } catch (err) {
        console.error(err)
        res.status(403).json({ error: err?.message || "Error occured." });
    }

};
export default withAdmin(user)
