import { send } from '../../mailer';

const contact = async (req, res) => {
    try {
        if (req.method === "POST") {
            const { email, name, message } = req.body;
            const html = `<div>
            <p>Name: ${name}</p>
            <p>Email: ${email}</p>
            <p>Message: ${message}</p>
            </div>`
            send(process.env.NEXT_PUBLIC_TO, name + " tried to contact", html)
            res.status(200).json({});
        } else {
            res.status(405).json(null);
        }
    } catch (err) {
        console.error(err)
        res.status(403).json({ error: err?.message || "Error occured." });
    }
};
export default contact