"use client";

import { SessionProvider } from "next-auth/react";
// import UpdateRole from "../UpdateRole";

export default function NextAuthProvider({ children }) {
    return <SessionProvider>
        {/* <UpdateRole /> */}
        {children}
    </SessionProvider>;
};
