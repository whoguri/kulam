"use client"
import { ADMIN, ADVERTISER, USER } from "@/constents/constArray";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import UserView from "./UserView"
import AdminView from "./AdminView"
import Layout from "../Layout";

export default function PollsComponent() {
    const { status, data } = useSession()
    const router = useRouter()
    const user = data?.user || {}
    const isAdmin = user?.role === ADMIN

    useEffect(() => {
        if (status === "unauthenticated") {
            // router.push("/")
        }
    }, [status])



    if (status === "loading") {
        return <Loading />
    }
    return (<>
        {isAdmin ? <AdminView /> : <UserView />}
    </>);
}
