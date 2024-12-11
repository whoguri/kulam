import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const pp = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        console.log(req.method)
        console.log(req.body);

        const s = {
            id: 'WH-19973937YW279670F-02S63370HL636500Y',
            event_version: '1.0',
            create_time: '2016-04-28T11:29:31Z',
            resource_type: 'Agreement',
            event_type: 'BILLING.SUBSCRIPTION.CREATED',
            summary: 'A billing subscription was created',
            resource: {
                id: 'I-PE7JWXKGVN0R',
                shipping_address: {
                    recipient_name: 'Cool Buyer',
                    line1: '3rd st',
                    line2: 'cool',
                    city: 'San Jose',
                    state: 'CA',
                    postal_code: '95112',
                    country_code: 'US'
                },
                plan: {
                    curr_code: 'USD',
                    links: [],
                    payment_definitions: [Array],
                    merchant_preferences: [Object]
                },
                payer: {
                    payment_method: 'paypal',
                    status: 'verified',
                    payer_info: [Object]
                },
                agreement_details: {
                    outstanding_balance: [Object],
                    num_cycles_remaining: '5',
                    num_cycles_completed: '0',
                    final_payment_due_date: '2017-11-30T10:00:00Z',
                    failed_payment_count: '0'
                },
                description: 'desc',
                state: 'Pending',
                links: [[Object]],
                start_date: '2016-04-30T07:00:00Z'
            },

        }



        res.status(201).json(true);

    } catch (err: any) {
        console.error(err.response?.data)
        res.status(500).json({ error: err?.message || "Error occured." });
    }

};
export default pp
