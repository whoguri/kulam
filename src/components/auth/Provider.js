"use client";

import { SessionProvider } from "next-auth/react";
import SaveRefCode from "./SaveRefCode"
export default function NextAuthProvider({ children }) {
    return <SessionProvider>
        <SaveRefCode />
        {children}
    </SessionProvider>;
};
