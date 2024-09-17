import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import prisma from "../lib/prisma";

const withAdmin = (handler: NextApiHandler): any => {
    return async (req: NextApiRequest & { user?: any }, res: NextApiResponse) => {
        // const session: any = await getToken({ req, secret: process.env.NEXT_AUTH_SECRET });
        // if (!session)
        //     return res.status(401).json({ error: 'Unauthorized' })
        // const user = await prisma.user.findFirst({ where: { email: session.email, status: "active", role: "admin" } })
        // if (!user)
        //     return res.status(401).json({ error: 'Unauthorized' })
        // req.user = user
        return handler(req, res);
    };
};

export default withAdmin;