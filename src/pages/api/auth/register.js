import { randomBytes } from 'crypto';
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
            // data.loginType = "EMAIL"

            if (data.referredBy) {
                const refUser = await prisma.user.findFirst({ where: { referralCode: data.referredBy } })
                if (!refUser)
                    return res.status(400).json({ error: "Wrong code" });
                data.referredByUser = { connect: { id: refUser.id } }
                data.role = "user"
            }

            delete data.referredBy
            const code = randomBytes(4).toString('hex')
            data.referralCode = code
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