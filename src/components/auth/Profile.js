"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Layout from "./../Layout"
import { useSession } from 'next-auth/react'
import { formatDate } from 'date-fns'
import { useRouter } from 'next/navigation'
import { BASE_URL } from '@/constents/constArray'
import axios from 'axios'
import { getError } from 'helper'
import Loading from "../Loading"
import { toast } from 'react-toastify'
import ReferralTree from "./ReferralTree"

function Profile() {
    const { status, data } = useSession()
    const sessionUser = data?.user || {}
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        if (status === "authenticated") {
            getProfile()
        } else if (status === "unauthenticated") {
            router.push("/")
        }
    }, [status])

    if (status === "loading") {
        return "loading.."
    }

    const getProfile = async () => {
        try {
            setLoading(true)
            let res = await axios.get("/api/auth/profile")
            setUser(res.data)
            setLoading(false)
        } catch (error) {
            console.log(getError(error))
            setLoading(false)
        }
    }

    return (<Layout title="Profile">
        {loading ? <Loading /> : <div className="2xl:max-w-7xl xl:max-w-6xl max-w-[90%] mx-auto py-10">
            <div>
                <div className="md:p-8 p-4 bg-white rounded-xl md:w-[80%] w-full mx-auto min-h-[90vh]">
                    <div className="flex md:flex-row flex-col items-center justify-between w-full">
                        <div className="flex items-center w-full gap-5">
                            <Image src={sessionUser?.image || "/images/user.png"} alt="user" height={150} width={150} className='border rounded-full md:h-[130px] md:w-[130px] h-20 w-20' />
                            <div>
                                <div className="capitalize text-xl">{user?.name}</div>
                                <div className="capitalize text-base">Member Since</div>
                                <div className="capitalize text-base">{formatDate(user?.registerOn, "MMM yyyy")}</div>
                            </div>
                        </div>
                        <div className='md:mt-0 mt-5'>
                            <div className='flex items-center gap-5'>
                                <div className='md:hidden'></div>
                                <div>
                                    <div className="capitalize text-xl">My Balance</div>
                                    <div className="capitalize text-base">2000</div>
                                    <button type='button' onClick={() => {
                                        navigator.clipboard.writeText(BASE_URL + "?ref=" + user?.referralCode)
                                        toast.success("Copied")
                                    }} className="text-base font-semibold text-[#0039CC] underline underline-offset-8 pt-1 whitespace-pre">
                                        Copy referral link
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="border-b border-black my-5" />

                    <div>
                        <h1 className='paragraph mb-2'>Referral Tree</h1>
                        {(user.tree || []).sort((a, b) => a.referrals.length > b.referrals.length ? -1 : 1).map((e, i) => <ReferralTree index={i} tree={e} key={i} isLast={(user.tree.length - 1) === i} />)}
                    </div>
                </div>
            </div>
        </div>}
    </Layout>)
}

export default Profile