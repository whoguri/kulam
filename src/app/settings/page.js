import { APP_NAME } from "@/constents/constArray";
import Settings from "../../../src/components/Settings"

export const metadata = {
    title: `Settings | ${APP_NAME}`, description: "",
};

export default function settings() {
    return <>
        <Settings />
    </>
}
