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
            // const user = await prisma.user.findFirst({ where: { email: data.email } });
            // if (user)
            //     return res.status(400).json({ error: "User already exists with same email" });
            // data.registerOn = new Date()
            // data.loginType = "EMAIL"
            // const result = await prisma.user.create({ data });
            res.status(405).json(null);

        } else {
            const { limit, skip, name, email, status, role } = req.query
            const q = {
                where: {},
                orderBy: { registerOn: 'desc' },
                select: USER_SELECT
            }
            if (name) {
                q.where.OR = [{ name: { contains: name, mode: "insensitive" } }]
            }
            if (email) {
                q.where.OR = [{ email: { contains: email, mode: "insensitive" } }]
            }

            if (limit) q.take = parseInt(limit)
            if (skip) q.skip = parseInt(skip)

            if (status) q.where.status = status
            if (role) q.where.role = role

            const result = await prisma.user.findMany(q);
            res.status(200).json(result);
        }
    } catch (err) {
        console.error(err)
        res.status(403).json({ error: err?.message || "Error occured." });
    }
};
export default withAdmin(users)