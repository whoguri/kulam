import Profile from "@/components/auth/Profile"
import { APP_NAME } from "@/constents/constArray";

export const metadata = {
    title: `Profile | ${APP_NAME}`, description: "",
};

export default function ProfilePage() {
    return <Profile />
}