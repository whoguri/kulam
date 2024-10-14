"use client"
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { ROLES } from '../../constents/constArray'
import Modal from '../Modal'
import { getError } from '../../../helper'
import InputWithValue from '../InputWithValue'

function UpdateRole({ open }) {
    const { data, status } = useSession()
    const user = data?.user || {}
    const hasEmail = user?.email || ''
    const [role, setRole] = useState("")
    const [sending, setSending] = useState(false)
    const router = useRouter()
    const [referredBy, setReferredBy] = useState("")
    const [name, setName] = useState()
    const [phone, setPhone] = useState("")
    const [city, setCity] = useState("")
    const [socialId, setSocialId] = useState("")

    useEffect(() => {
        if (typeof window !== "undefined")
            setReferredBy(localStorage.getItem("referredBy"))
    }, [])

    useEffect(() => {
        if (status === "authenticated") {
            setName(user?.name)
            if (role !== "tbd") {
                setRole(user.role)
            }
        }
    }, [status, user])

    const onSubmit = async () => {
        try {
            if (!role) {
                toast.error("בחר סוג משתמש")
                return
            }
            if (!name) {
                toast.error("שם מלא ")
                return
            }
            if (!hasEmail && !phone) {
                toast.error("מספר נייד")
                return
            }
            if (!city) {
                toast.error("עיר")
                return
            }
            setSending(true)
            const res = await axios.put("/api/auth/finish", { role, referredBy: referredBy || "", name, phone, city, socialId })
            if (res.status === 200) {
                toast.success("Updated Successfully")
                localStorage.removeItem("referredBy")
                // setSending(false)
                // router.push("/")
                window.location.reload()
                if (user?.referredBy) {
                    localStorage.clear()
                }
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
        {open && <Modal title="Update Role" closeButton={false}
            footer={<button disabled={sending} onClick={() => { onSubmit() }} type='button' className='bg-primary px-4 py-2  border border-primary text-white rounded-md text-xl uppercase hover:bg-white hover:text-primary font-semibold'>
                {sending ? "Saving" : "Save"}
            </button>} >
            {user.role === "tbd" && <div className='grid md:grid-cols-2 gap-8'>
                {ROLES.map((e, i) => {
                    if (e.value === "admin") {
                        return null
                    }
                    return <div onClick={() => { setRole(e.value) }} key={e.value} className={`text-center border px-8 py-10 md:text-2xl capitalize font-medium rounded-lg transition-all duration-300  ${role === e.value ? "border-primary bg-primary text-white" : " border-primary-dark cursor-pointer hover:text-primary hover:border-primary"}`}>
                        {e.label}
                    </div>
                })}
            </div>}
            <div className='grid md:grid-cols-2 gap-x-4 gap-y-2'>
                <InputWithValue label='שם' value={name}
                    onChange={(e) => { setName(e.target.value) }} />
                <InputWithValue label='נייד' value={phone} type='number'
                    onChange={(e) => { setPhone(e.target.value) }} />
                <InputWithValue label='עיר' value={city}
                    onChange={(e) => { setCity(e.target.value) }} />
                <InputWithValue label='תעודת זהות' value={socialId}
                    onChange={(e) => { setSocialId(e.target.value) }} />
            </div>
        </Modal>}
    </>)
}

export default UpdateRole
