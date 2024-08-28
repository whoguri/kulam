import Layout from "@/components/Layout";
import PollsCompnent from "../../components/PollsComponent"
import { APP_NAME } from "@/constents/constArray";

export const metadata = {
    title: `Polls | ${APP_NAME}`, description: "",
};

export default function Polls() {
    return <Layout title="Polls">
        <PollsCompnent />
    </Layout>
}
