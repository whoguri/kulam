"use client";

import { SessionProvider } from "next-auth/react";
import UpdateRole from "./UpdateRole";
import SaveRefCode from "./SaveRefCode"
export default function NextAuthProvider({ children }) {
    return <SessionProvider>
        <SaveRefCode />
        <UpdateRole />
        {children}
    </SessionProvider>;
};
