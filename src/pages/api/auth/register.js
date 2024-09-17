import prisma from '../../../lib/prisma'
import bcrypt from 'bcrypt';

const register = async (req, res) => {
    const data = req.body;
    try {
        if (req.method === "POST") {
            const user = await prisma.user.findFirst({ where: { userName: data.userName } });
            if (user)
                return res.status(400).json({ error: "User already exists with same userName" });
            const hashedPassword = await bcrypt.hash(data.password, 10);
            data.password = hashedPassword
            data.registerOn = new Date()
            data.loginType = "EMAIL"
            const result = await prisma.user.create({ data });
            res.status(200).json(result);

        } else {
            res.status(404).json(null);
        }
    } catch (err) {
        console.error(err)
        res.status(403).json({ error: err?.message || "Error occured." });
    }
};
export default register