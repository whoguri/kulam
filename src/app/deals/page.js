import Layout from "@/components/Layout";
import DealsComponent from "../../components/DealsComponent"
import { APP_NAME } from "@/constents/constArray";

export const metadata = {
    title: `Deals | ${APP_NAME}`, description: "",
};

export default function Deals() {

    return <Layout title="Deals">
        <DealsComponent />
    </Layout>
}
