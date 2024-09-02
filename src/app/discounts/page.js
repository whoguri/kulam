import { APP_NAME } from "@/constents/constArray";
import DiscountsComponent from "../../components/DiscountsComponent"
export const metadata = {
    title: `Discounts | ${APP_NAME}`, description: "",
};

export default function Discounts() {

    return <DiscountsComponent />
}
