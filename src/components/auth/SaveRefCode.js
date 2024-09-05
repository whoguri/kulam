'use client'

import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import React, { Suspense, useState } from 'react'
import { useEffect } from 'react'
import AddReffrelCode from "./AddReffrelCode"
import UpdateRole from "./UpdateRole"
import { BASE_URL } from '@/constents/constArray'
import { toast } from 'react-toastify'
import { getError } from 'helper'
import axios from 'axios'

function SaveRefCode_() {
    const { status, data } = useSession()
    const search = useSearchParams()
    const user = data?.user || {}
    const code = search.get('ref')
    const [openRefModal, setOpenRefModal] = useState(false)
    const [open, setOpen] = useState(false)


    useEffect(() => {
        const localCode = localStorage.getItem("referredBy")
        console.log(">>>", localCode, status)

        if (status === "authenticated") {
            if (user.role === "tbd") {
                if (localCode) {
                    finish(localCode)
                } else {
                    setOpen(true)
                }
            } else {
                if (localCode)
                    localStorage.removeItem("referredBy")
                if (code)
                    gotoHome()
            }
        } else if (status === "unauthenticated") {
            if (code) {
                localStorage.setItem('referredBy', code)
                setOpenRefModal(true)
            }
        }
    }, [code, status])

    const gotoHome = async () => {
        window.location.href = BASE_URL
    }
    const finish = async (code) => {
        try {
            await axios.put("/api/auth/finish", { referredBy: code, role: "user" })
            localStorage.removeItem("referredBy")
            gotoHome()
        } catch (error) {
            toast.error(getError(error))
        }
    }
    return (<>
        <AddReffrelCode open={openRefModal} setOpen={setOpenRefModal} />
        {open && <UpdateRole open={open} setOpen={setOpen} />}
    </>)
}

export default function SaveRefCode() {
    return <Suspense fallback={<></>}>
        <SaveRefCode_ />
    </Suspense>
}
