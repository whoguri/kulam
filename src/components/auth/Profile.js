"use client"
import Image from 'next/image'
import React, { useEffect } from 'react'
import Layout from "./../Layout"
import { useSession } from 'next-auth/react'
import { formatDate } from 'date-fns'
import { useRouter } from 'next/navigation'

function Profile() {
    const { data, status } = useSession()
    const user = data?.user || {}
    const router = useRouter()

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/")
        }
    }), [status]
    console.log(status)
    if (status === "loading") {
        return "loading.."
    }
    return (<Layout title="Profile">
        {(user && user?.id) && <div className="max-w-7xl mx-auto py-10 h-screen">
            <div>
                <div className="py-8 px-10 bg-white rounded-xl h-[90vh]">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-5">
                            <Image src={user?.image || "/images/user.png"} alt="user" height={170} width={170} />
                            <div>
                                <div className="capitalize text-[32px]">{user?.name}</div>
                                <div className="capitalize text-xl">Member Since</div>
                                <div className="capitalize text-xl">{formatDate(user?.registerOn, "MM yyyy")}</div>
                            </div>
                        </div>
                        <div>
                            <div className="capitalize text-[32px]">My Balance</div>
                            <div className="capitalize text-xl">2000</div>
                            <div className="text-xl font-semibold text-[#0039CC] underline underline-offset-8 pt-1"> Copy referral link</div>
                        </div>
                    </div>
                    <hr className="border-b border-black mt-5" />
                </div>
            </div>
        </div>}
    </Layout>)
}

export default Profile
