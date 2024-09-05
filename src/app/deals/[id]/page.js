import { APP_NAME } from "@/constents/constArray";
import DealList from "../../../components/DealList"

export const metadata = {
    title: `Deal | ${APP_NAME}`, description: "",
};

export default function DealDetail() {
    return <div>
        <DealList />
    </div>
}