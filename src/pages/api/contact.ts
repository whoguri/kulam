import { NextApiRequest, NextApiResponse } from 'next';

const contact = async (req: NextApiRequest, res: NextApiResponse) => {
    const data = req.body;
    try {
        if (req.method === "post") {
            res.status(200).json({});
        } else {
            res.status(404).json(null);
        }
    } catch (err: any) {
        console.error(err)
        res.status(403).json({ error: err?.message || "Error occured." });
    }
};
export default contact