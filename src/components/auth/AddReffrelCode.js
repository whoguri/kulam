"use client"
import { signIn } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import { BASE_URL } from '../../constents/constArray'
import Modal from '../Modal'

function AddReffrelCode({ open }) {
    const [sending, setSending] = useState(false)
    const [referredBy, setReferredBy] = useState("")
    const [refUser, setRefUser] = useState(null)
    const search = useSearchParams()
    const code = search.get('ref')

    useEffect(() => {
        if (typeof window !== "undefined")
            if (code) {
                setReferredBy(code)
            }
    }, [])

    useEffect(() => {
        if (referredBy || code) {
            getRerUser()
        }
    }, [referredBy])

    const getRerUser = async () => {
        try {
            const res = await axios.get(`/api/referral/${referredBy || code}`)
            setRefUser(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (<>
        {open && <Modal title="Join" closeButton={false}
            footer={<div className='flex justify-center gap-2 w-full'>
                <button disabled={sending} onClick={() => {
                    setSending(true)
                    signIn("google", { callbackUrl: "/" })
                }} type='button' className='bg-primary px-4 py-2  border border-primary text-white rounded-md text-xl uppercase hover:bg-white hover:text-primary font-semibold'>
                    {sending ? "Joining" : "join"}
                </button>
                <button onClick={() => {
                    localStorage.clear()
                    window.location.href = BASE_URL
                }} type='button' className=' px-4 py-2 text-red-500 rounded-md text-xl uppercase font-semibold'>
                    Decline
                </button>
            </div>} >
            <div className=''>
                Referred By {refUser?.name || "..."}
            </div>
        </Modal>}
    </>)
}

export default AddReffrelCode
