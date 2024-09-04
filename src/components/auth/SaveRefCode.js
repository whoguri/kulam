'use client'

import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import React, { Suspense, useState } from 'react'
import { useEffect } from 'react'
import AddReffrelCode from "./AddReffrelCode"

function SaveRefCode_() {
    const { status, data } = useSession()
    const search = useSearchParams()
    const user = data?.user || {}
    const code = search.get('ref')
    const [openRefModal, setOpenRefModal] = useState(false)

    useEffect(() => {
        if (code) {
            localStorage.setItem('referredBy', code)
        }
        if (status === "authenticated") {
            if (user?.referredBy) {
                localStorage.clear()
            } else {
                setOpenRefModal(true)
            }
        }
    }, [code, status])

    return (<>
        <AddReffrelCode open={openRefModal} setOpen={setOpenRefModal} />
    </>)
}

export default function SaveRefCode() {
    return <Suspense fallback={<></>}><SaveRefCode_ /></Suspense>
}
