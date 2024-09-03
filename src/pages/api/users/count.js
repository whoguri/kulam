import withAdmin from '@/middlewares/with-admin';
import prisma from '../../../lib/prisma'

const users = async (req, res) => {
    try {
        if (req.method === "GET") {
            const { name, email, status, role } = req.query
            const q = {
                where: {},
            }
            if (name) {
                q.where.OR = [{ name: { contains: name, mode: "insensitive" } }]
            }
            if (email) {
                q.where.OR = [{ email: { contains: email, mode: "insensitive" } }]
            }

            if (status) q.where.status = status
            if (role) q.where.role = role

            const result = await prisma.user.count(q);
            res.status(200).json(result);
        } else {
            res.status(200).json(0);
        }
    } catch (err) {
        console.error(err)
        res.status(403).json({ error: err?.message || "Error occured." });
    }
};
export default withAdmin(users)