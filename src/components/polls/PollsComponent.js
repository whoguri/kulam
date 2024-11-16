"use client"
import { ADMIN, ADVERTISER, } from "@/constents/constArray";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "../Loading";
import UserView from "./UserView"
import AdminView from "./AdminView"

export default function PollsComponent() {
    const { status, data } = useSession()
    const router = useRouter()
    const user = data?.user || {}
    const isAdmin = user?.role === ADMIN
    const isAdvertiser = user?.role === ADVERTISER

    useEffect(() => {
        if (status === "unauthenticated" || isAdvertiser) {
            router.push("/")
        }
    }, [status])


    if (status === "loading") {
        return <Loading />
    }
    return (<>
        {isAdvertiser ? "" : (isAdmin ? <AdminView /> : <UserView />)}
    </>);
}
