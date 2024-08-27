import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const withSession = (handler: any): any => {
    return async (req: NextApiRequest & { user?: any }, res: NextApiResponse) => {
        const session: any = await getToken({ req, secret: process.env.NEXT_AUTH_SECRET });

        if (!session) {
            return res.status(401).json({ error: 'Unauthorized' })
        } else {
            const user = await prisma.user.findUnique({ where: { email: session.email, status: "active" } })
            if (!user || user.status !== "active")
                return res.status(401).json({ error: 'Unauthorized' })

            req.user = user
        }
        return handler(req, res);
    };
};

export default withSession;