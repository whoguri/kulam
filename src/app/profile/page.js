import Profile from "@/components/auth/Profile"
import { APP_NAME } from "../../constent/AppData"

export const metadata = {
    title: "Profile | " + APP_NAME,
};

export default function ProfilePage() {
    return <Profile />
}