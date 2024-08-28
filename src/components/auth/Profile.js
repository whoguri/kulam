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
        {(user && user?.id) && <div className="max-w-7xl md:mx-auto mx-3 py-10 h-screen">
            <div>
                <div className="py-8 md:px-10 px-3 bg-white rounded-xl md:w-[80%] w-full mx-auto h-[90vh]">
                    <div className="flex md:flex-row flex-col items-center justify-between w-full">
                        <div className="flex items-center w-full gap-5">
                            <Image src={user?.image || "/images/user.png"} alt="user" height={170} width={170} className='rounded-full md:h-[170px] md:w-[170px] h-20 w-20' />
                            <div>
                                <div className="capitalize md:text-[32px] text-2xl">{user?.name}</div>
                                <div className="capitalize md:text-xl text-base md:py-1">Member Since</div>
                                <div className="capitalize md:text-xl text-base">{formatDate(user?.registerOn, "MM yyyy")}</div>
                            </div>
                        </div>
                        <div className='md:mt-0 mt-5'>
                            <div className="capitalize md:text-[32px] text-2xl">My Balance</div>
                            <div className="capitalize md:text-xl text-base md:py-1">2000</div>
                            <div className="md:text-xl text-base font-semibold text-[#0039CC] underline underline-offset-8 pt-1"> Copy referral link</div>
                        </div>
                    </div>
                    <hr className="border-b border-black mt-5" />
                </div>
            </div>
        </div>}
    </Layout>)
}

export default Profile
