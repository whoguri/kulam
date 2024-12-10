import prisma from "@/lib/prisma";
import withSession from "@/middlewares/with-session";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const settings = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === "PUT") {
            //@ts-ignore
            if (req.user.role !== "admin")
                return res.status(401).json(null);
            const { amountMonth, amountYear, gen_1, gen_2, gen_3, gen_1_p, gen_2_p, gen_3_p }: any = req.body;
            await prisma.setting.upsert({
                where: { v: 0 },
                update: { amountYear, amountMonth, gen_1, gen_2, gen_3, gen_1_p, gen_2_p, gen_3_p },
                create: { amountYear, amountMonth, gen_1, gen_2, gen_3, v: 0, gen_1_p, gen_2_p, gen_3_p }
            });
            // const url = 'https://api-m.sandbox.paypal.com/v1/oauth2/token';

            // const clientId = 'Abd-8Fo6S2lA0w4qoKuceeUemYAZKjGNkGZ4P6F_fH9rXuqW7bHz9z59ahJkpQULzXhplGYPrWqavm7I';
            // const clientSecret = 'EL4gr-nDT2bA3GtShmAYnrQEyjF863WC7_qYmWFpzUkeSZ7f1u7wtZOYBM92xpJLghHQq2v1MDzjDG_c';
            // const respp = await axios({
            //     method: 'post',
            //     url: url,
            //     headers: {
            //         'Content-Type': 'application/x-www-form-urlencoded',
            //     },
            //     auth: {
            //         username: clientId,
            //         password: clientSecret,
            //     },
            //     data: 'grant_type=client_credentials',
            // });

            // console.log('Access Token:', respp.data?.access_token);
            // const h = {
            //     headers: {
            //         'Authorization': 'Bearer ' + respp.data?.access_token,
            //         'Content-Type': 'application/json',
            //         'Accept': 'application/json',
            //         'Prefer': 'return=representation'
            //     }
            // }
            // // await axios.post('https://api-m.sandbox.paypal.com/v1/billing/plans/P-9X755875SJ295634JM5MBNCQ/deactivate', {}, h)
            // const respp2 = await axios.post('https://api-m.sandbox.paypal.com/v1/billing/plans/P-9X755875SJ295634JM5MBNCQ/update-pricing-schemes', {
            //     pricing_schemes: [
            //         {
            //             billing_cycle_sequence: 1,
            //             pricing_scheme: {
            //                 fixed_price: {
            //                     value: "50",
            //                     currency_code: "ILS"
            //                 }
            //             }
            //         },
            //         {
            //             billing_cycle_sequence: 2,
            //             pricing_scheme: {
            //                 fixed_price: {
            //                     value: "100",
            //                     currency_code: "ILS"
            //                 },
            //                 pricing_model: "VOLUME",
            //                 tiers: [
            //                     {
            //                         starting_quantity: "1",
            //                         ending_quantity: "1000",
            //                         amount: {
            //                             value: "150",
            //                             currency_code: "ILS"
            //                         }
            //                     },
            //                     {
            //                         starting_quantity: "1001",
            //                         amount: {
            //                             value: "250",
            //                             currency_code: "ILS"
            //                         }
            //                     }
            //                 ]
            //             }
            //         }
            //     ]
            // }, h);
            // await axios.post('https://api-m.sandbox.paypal.com/v1/billing/plans/P-9X755875SJ295634JM5MBNCQ/activate', {}, h)

            // console.log(respp2.data)
            // if (respp2.data.debug_id)
            //     return res.status(400).json(null);
            res.status(201).json(null);
        } else if (req.method === "GET") {
            const result = await prisma.setting.findFirst({ where: { v: 0 } });
            res.status(200).json(result);
        } else {
            res.status(404).json(null);
        }
    } catch (err: any) {
        console.error(err.response?.data)
        res.status(500).json({ error: err?.message || "Error occured." });
    }

};
export default withSession(settings)
