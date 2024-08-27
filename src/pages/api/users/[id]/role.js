import prisma from "../../../../lib/prisma";
import withAdmin from "../../../../middlewares/with-admin";

const user = async (req, res) => {
    const { role } = req.body;
    const id = req.query.id
    try {
        if (req.method === "PUT") {
            const result = await prisma.user.update({ where: { "id": id }, data: { role } });
            res.status(200).json(result);
        } else {
            res.status(404).json(null);
        }
    } catch (err) {
        console.error(err)
        res.status(403).json({ error: err?.message || "Error occured." });
    }

};
export default withAdmin(user)
