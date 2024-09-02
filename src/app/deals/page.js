import Layout from "@/components/Layout";
import { APP_NAME } from "@/constents/constArray";
import DealsComponent from "../../components/DealsComponent"

export const metadata = {
    title: `Deals | ${APP_NAME}`, description: "",
};

export default function Deals() {
    return <div>
        <DealsComponent />
    </div>
}
