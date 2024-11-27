import { APP_NAME } from "@/constents/constArray";
import DiscountList from "../../../components/DiscountlList";

export const metadata = {
    title: `Discount | ${APP_NAME}`, description: "",
};

export default function DiscountlDetail() {
    return <div>
        <DiscountList />
    </div>
}