import Layout from "@/components/Layout";
import ContactComponent from "../../components/ContactComponent"
import { APP_NAME } from "@/constents/constArray";

export const metadata = {
    title: `יצירת קשר | ${APP_NAME}`, description: "",
};

export default function Contact() {
    return <Layout title="יצירת קשר">
        <ContactComponent />
    </Layout>
}