"use client"
import { formatDate } from 'date-fns'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import Loading from "./Loading"

function MembershipComponent() {
    const { data, status } = useSession()
    const router = useRouter()
    const user = data?.user || {}
    const isSubscribed = user?.subscriptions.length > 0

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/")
        }
    }, [status])

    return (<div className='relative'>
        {status === "loading" ? <div className="py-20 h-screen gradient-bg flex justify-center items-center">
            <Loading />
        </div> : <div >
            <Link href="/profile" className='absolute top-8 left-8 z-10 inline-flex justify-center items-center border border-white px-4 py-2 rounded-full text-white md:text-xl'>
                <span className='inline-flex'>
                    <svg className='md:w-5 md:h-5' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m4.296 12l8.492-8.727a.75.75 0 1 0-1.075-1.046l-9 9.25a.75.75 0 0 0 0 1.046l9 9.25a.75.75 0 1 0 1.075-1.046z" /></svg>            </span>
                <span className='inline-flex'>Back</span>
            </Link>
            {isSubscribed ? <div className="2xl:max-w-7xl xl:max-w-6xl max-w-[90%] mx-auto py-20 h-screen flex justify-center items-center">
                <div className="flex justify-center items-center bg-gray-100 rounded-xl p-3 md:w-auto w-full">
                    <div className="md:w-80 w-full bg-white rounded-lg shadow-lg px-6 py-20">
                        <div className='flex items-center justify-center gap-5 mb-4'>

                            {user?.image && <div className="flex justify-center">
                                <Image
                                    placeholder='empty'
                                    src={user.image}
                                    alt="Profile Picture"
                                    width={80}
                                    height={80}
                                    className="rounded-full border-2 border-gray-300"
                                />
                            </div>}
                            <div>
                                <Image src="/images/qr-code.png" alt='qr' height={95} width={95} className='h-[85px] object-contain' />
                            </div>
                        </div>
                        <div className="text-center">
                            <h2 className="text-xl font-semibold text-background">{user?.name || user?.userName}</h2>
                        </div>

                        <div>
                            <div className='flex items-center justify-center font-semibold text-base'>
                                <span>{formatDate(new Date(), "dd/MM/yyyy - HH:mm")}</span>
                            </div>
                            <div className='border-t border-black mt-1'></div>
                        </div>

                        <div className="mt-4">
                            {user?.registerOn && <div className="flex justify-between font-semibold text-base text-background">
                                <span>Join on:</span>
                                <span>{formatDate(user.registerOn, "dd/MM/yyyy - HH:mm")}</span>
                            </div>}
                            <div className="flex justify-between font-semibold text-base text-background mt-2">
                                <span>Email:</span>
                                <span>{user?.email}</span>
                            </div>
                            <div className="flex justify-between font-semibold text-base text-background mt-2">
                                <span>Phone:</span>
                                <span>{user?.phone}</span>
                            </div>
                            <div className="flex justify-between font-semibold text-base text-background mt-2">
                                <span>City:</span>
                                <span>{user?.city}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div> : <div>
                Start a subscription to get membership card
            </div>}
        </div>}
    </div>
    )
}

export default MembershipComponent