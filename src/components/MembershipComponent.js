"use client"
import { formatDate } from 'date-fns'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

function MembershipComponent() {
    const { data, status } = useSession()
    const router = useRouter()
    const user = data?.user || {}

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/")
        }
    }, [status])

    return (<div className='relative'>
        <Link href="/" className='absolute top-8 left-8 z-10 inline-flex justify-center items-center border border-white px-4 py-2 rounded-full text-white md:text-xl'>
            <span className='inline-flex'>
                <svg className='md:w-5 md:h-5' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m4.296 12l8.492-8.727a.75.75 0 1 0-1.075-1.046l-9 9.25a.75.75 0 0 0 0 1.046l9 9.25a.75.75 0 1 0 1.075-1.046z" /></svg>            </span>
            <span className='inline-flex'>Back</span>
        </Link>
        <div className="2xl:max-w-7xl xl:max-w-6xl max-w-[90%] mx-auto py-20 h-screen  flex justify-center items-center">
            <div className="flex justify-center items-center bg-gray-100 rounded-xl p-3 md:w-auto w-full">
                <div className="md:w-80 w-full bg-white rounded-lg shadow-lg p-6">
                    {user?.image && <div className="flex justify-center mb-4">
                        <Image
                            placeholder='empty'
                            src={user.image}
                            alt="Profile Picture"
                            width={80}
                            height={80}
                            className="rounded-full border-2 border-gray-300"
                        />
                    </div>}
                    <div className="text-center">
                        <h2 className="text-lg font-semibold text-background">{user?.name || user?.userName}</h2>
                    </div>
                    <div className="mt-4">
                        {user?.registerOn && <div className="flex justify-between text-sm text-background">
                            <span>Join on:</span>
                            <span>{formatDate(user.registerOn, "dd/MM/yyyy - HH:mm")}</span>
                        </div>}
                        <div className="flex justify-between text-sm text-background mt-2">
                            <span>Email:</span>
                            <span>{user?.email}</span>
                        </div>
                        <div className="flex justify-between text-sm text-background mt-2">
                            <span>Phone:</span>
                            <span>{user?.phone}</span>
                        </div>
                        <div className="flex justify-between text-sm text-background mt-2">
                            <span>City:</span>
                            <span>{user?.city}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default MembershipComponent