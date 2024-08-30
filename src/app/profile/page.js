import Profile from "@/components/auth/Profile"
import { APP_NAME } from "@/constents/constArray";
import Layout from "../../components/Layout";

export const metadata = {
    title: `Profile | ${APP_NAME}`, description: "",
};

export default function ProfilePage() {
    return <Layout title="Profile">
        <Profile />
    </Layout>
}