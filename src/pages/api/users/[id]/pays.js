import prisma from "../../../../lib/prisma";
import withSession from "../../../../middlewares/with-session";

const user = async (req, res) => {
    let id = req.query.id
    try {
        if (req.method === "GET") {
            if (req.user.role !== "admin")
                id = req.user.id
            const pays = await prisma.payLog.findMany({
                where: { userId: id }
            });
            res.status(200).json(pays);
        } else {
            res.status(404).json(null);
        }
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: err?.message || "Error occured." });
    }

};
export default withSession(user)
