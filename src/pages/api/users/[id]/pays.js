import prisma from "../../../../lib/prisma";
import withAdmin from "../../../../middlewares/with-admin";

const user = async (req, res) => {
    const id = req.query.id
    try {
        if (req.method === "GET") {
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
export default withAdmin(user)
