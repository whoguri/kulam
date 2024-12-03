import prisma from "../../../../lib/prisma";
import withAdmin from "../../../../middlewares/with-admin";

const user = async (req, res) => {
    const id = req.query.id
    try {
        if (req.method === "POST") {
            const user = await prisma.user.findFirst({ where: { "id": id } });
            const balance = user.balance
            if (!balance)
                return res.status(400).json({ error: "No balance" });
            await prisma.payLog.create({
                data: {
                    user: { connect: { id: id } }, date: new Date(), amount: balance, type: "WITHDRAW",
                    fromUserId: req.user.id, details: "By Admin"
                }
            });
            await prisma.user.update({ where: { "id": id }, data: { balance: 0, total: { increment: balance } } });
            res.status(201).json(null);
        } else {
            res.status(404).json(null);
        }
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: err?.message || "Error occured." });
    }

};
export default withAdmin(user)
