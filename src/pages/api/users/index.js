import { USER_SELECT } from '../../../../prisma/select';
import prisma from '../../../lib/prisma'
import withAdmin from '@/middlewares/with-admin';
// import bcrypt from 'bcrypt';

const users = async (req, res) => {
    const data = req.body;
    try {
        if (req.isDriver)
            return res.status(401).json({ error: "Unauthorized" });

        if (req.method === "POST") {
            const user = await prisma.user.findFirst({ where: { email: data.email } });
            if (user)
                return res.status(400).json({ error: "User already exists with same email" });
            // const hashedPassword = await bcrypt.hash(data.password, 10);
            // data.password = hashedPassword
            data.registerOn = new Date()
            data.loginType = "EMAIL"
            const result = await prisma.user.create({ data });
            res.status(200).json(result);

        } else {
            const { limit, skip, name, email, status, role, includePublisher, pStatus } = req.query
            const q = {
                where: {},
                orderBy: { registerOn: 'desc' },
                select: USER_SELECT
            }
            if (name) {
                q.where.OR = [{ name: { contains: name, mode: "insensitive" } }, { publishers: { some: { name: { contains: name, mode: "insensitive" } } } }]
            }
            if (email) {
                q.where.OR = [{ email: { contains: email, mode: "insensitive" } }]
            }

            if (limit) q.take = parseInt(limit)
            if (skip) q.skip = parseInt(skip)

            if (status) q.where.status = status
            if (role === "user") q.where.role = { in: ["admin", "blogger"] }
            else if (role) q.where.role = role
            if (includePublisher === "y") {
                q.select.publishers = { select: { id: true, status: true, name: true } }
            }
            if (pStatus)
                q.where.publishers = { some: { status: pStatus } }

            const result = await prisma.user.findMany(q);
            res.status(200).json(result);
        }
    } catch (err) {
        console.error(err)
        res.status(403).json({ error: err?.message || "Error occured." });
    }
};
export default withAdmin(users)