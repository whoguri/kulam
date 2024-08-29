'use client'

import { useSearchParams } from 'next/navigation'
import React, { Suspense } from 'react'
import { useEffect } from 'react'

function SaveRefCode_() {
    const search = useSearchParams()
    const code = search.get('ref')

    useEffect(() => {
        if (code) {
            localStorage.setItem('referredBy', code)
        }
    }, [code])

    return (<></>)
}



export default function SaveRefCode() {
    return <Suspense fallback={<></>}><SaveRefCode_ /></Suspense>
}
