"use client"
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { ROLES } from '../../constents/constArray'
import Modal from '../Modal'
import { getError } from '../../../helper'

function AddReffrelCode({ open, setOpen }) {
    const { data, status } = useSession()
    const user = data?.user || {}
    const [sending, setSending] = useState(false)
    const router = useRouter()
    const [referredBy, setReferredBy] = useState("")
    const [refUser, setRefUser] = useState(null)

    useEffect(() => {
        if (typeof window !== "undefined")
            setReferredBy(localStorage.getItem("referredBy"))
    }, [])

    useEffect(() => {
        if (referredBy) {
            getRerUser()
        }
    }, [referredBy])

    const getRerUser = async () => {
        try {
            const res = await axios.get(`/api/referral/${referredBy}`)
            setRefUser(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const onSubmit = async () => {
        try {
            setSending(true)
            const res = await axios.put("/api/auth/finish", { referredBy: referredBy, role: user?.role })
            if (res.status === 200) {
                toast.success("Updated Successfully")
                setSending(false)
                router.push("/")
                setTimeout(() => {
                    window.location.reload()
                }, 500);
                localStorage.clear()
            } else {
                toast.error("Something went wrong")
                setSending(false)
            }
        } catch (error) {
            setSending(false)
            toast.error(getError(error))
        }
    }

    return (<>
        {open && <Modal title="Update Role" onClose={() => { setOpen(true) }} closeButton={false}
            footer={<div className='flex justify-center gap-2 w-full'>
                <button disabled={sending} onClick={() => { onSubmit() }} type='button' className='bg-primary px-4 py-2  border border-primary text-white rounded-md text-xl uppercase hover:bg-white hover:text-primary font-semibold'>
                    {sending ? "Joining" : "join"}
                </button>
                <button disabled={sending} onClick={() => { localStorage.clear() }} type='button' className='bg-primary px-4 py-2  border border-primary text-white rounded-md text-xl uppercase hover:bg-white hover:text-primary font-semibold'>
                    Decline
                </button>
            </div>} >
            <div className=''>
                Referred By {refUser?.name}
            </div>
        </Modal>}
    </>)
}

export default AddReffrelCode
