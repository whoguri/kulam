// import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { send } from "@/mailer";


const pp = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        console.log(">>>>>", req.method)
        console.log(">>>>>", JSON.stringify(req.body));
        send("whoguri@fkointech.com", "pp data", `<div>${req.method}: ${JSON.stringify(req.body)}</div>`)

        const data = req.body;
        const a = {
            id: 'WH-18E47623P43947638-8DB26843Y1048423E',
            event_version: '1.0',
            create_time: '2024-12-23T07:09:02.115Z',
            resource_type: 'subscription',
            resource_version: '2.0',
            event_type: 'BILLING.SUBSCRIPTION.CREATED',
            summary: 'Subscription created',
            resource: {
                start_time: '2024-12-23T07:09:01Z',
                quantity: '1',
                create_time: '2024-12-23T07:09:01Z',
                links: [[Object], [Object], [Object]],
                id: 'I-5PDN2S7GJY1S',
                plan_overridden: false,
                plan_id: 'P-9X755875SJ295634JM5MBNCQ',
                status: 'APPROVAL_PENDING'
            },

        }


        // need user Id
        console.log(">>>>>", data.resource?.status, data.resource?.custom_id);

        // a.resource.status: 'APPROVAL_PENDING' | ''
        // a.resource.custom_id

        res.status(200).json({ custom_id: "xx", status: "success" });

    } catch (err: any) {
        console.error(err.response?.data)
        res.status(500).json({ error: err?.message || "Error occured." });
    }

};
export default pp
