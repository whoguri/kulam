"use client"
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { ROLES } from '../../constents/constArray'
import Modal from '../Modal'
import { getError } from '../../../helper'

function UpdateRole() {
    const { data, status } = useSession()
    const user = data?.user || {}
    const [open, setOpen] = useState(false)
    const [role, setRole] = useState("")
    const [sending, setSending] = useState(false)
    const router = useRouter()
    const [referredBy, setReferredBy] = useState("")

    useEffect(() => {
        if (typeof window !== "undefined")
            setReferredBy(localStorage.getItem("referredBy"))
    }, [])

    useEffect(() => {
        if (status === "authenticated") {
            if (user?.role === "tbd") {
                setOpen(true)
            }
        }
    }, [status, user])

    console.log(referredBy)
    const onSubmit = async () => {
        try {
            if (!role) {
                toast.error("Select Role")
                return
            }
            setSending(true)
            const res = await axios.put("/api/auth/finish", { role, referredBy: referredBy || "" })
            if (res.status === 200) {
                toast.success("Updated Successfully")
                setSending(false)
                router.push("/")
                window.location.reload()
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
            footer={<button disabled={sending} onClick={() => { onSubmit() }} type='button' className='bg-primary px-4 py-2  border border-primary text-white rounded-md text-xl uppercase hover:bg-white hover:text-primary font-semibold'>
                {sending ? "Saving" : "Save"}
            </button>} >
            <div className='grid md:grid-cols-2 gap-8'>
                {ROLES.map((e, i) => {
                    if (e === "admin") {
                        return null
                    }
                    return <div onClick={() => { setRole(e) }} key={e} className={`text-center border px-8 py-10 md:text-2xl capitalize font-medium rounded-lg transition-all duration-300  ${role === e ? "border-primary bg-primary text-white" : " border-secondary-light cursor-pointer hover:text-primary hover:border-primary"}`}>
                        {e}
                    </div>
                })}
            </div>
        </Modal>}
    </>)
}

export default UpdateRole