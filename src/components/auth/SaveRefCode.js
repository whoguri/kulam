'use client'

import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import React, { Suspense } from 'react'
import { useEffect } from 'react'
import AddReffrelCode from "./AddReffrelCode"

function SaveRefCode_() {
    const { status, data } = useSession()
    const search = useSearchParams()
    const code = search.get('ref')
    // const[openRefModal]
    useEffect(() => {
        if (code) {
            localStorage.setItem('referredBy', code)
        }
        if (status === "authenticated") {
            if (user?.referredBy) {
                localStorage.clear()
            } else {

            }
        }
    }, [code, status])

    return (<>
        {/* <AddReffrelCode /> */}
    </>)
}

export default function SaveRefCode() {
    return <Suspense fallback={<></>}><SaveRefCode_ /></Suspense>
}
