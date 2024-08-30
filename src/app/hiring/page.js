import { APP_NAME } from "@/constents/constArray";
import HiringComponent from "../../components/HiringComponent"

export const metadata = {
    title: `Hiring | ${APP_NAME}`, description: "",
};

export default function Hiring() {
    return <div>
        <HiringComponent />
    </div>
}