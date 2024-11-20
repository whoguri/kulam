import PollsCompnent from "../../components/polls/PollsComponent"
import { APP_NAME } from "@/constents/constArray";

export const metadata = {
    title: `Polls | ${APP_NAME}`, description: "",
};

export default function Polls() {
    return <PollsCompnent />
}
