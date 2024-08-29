'use client'

import { useSearchParams } from 'next/navigation'
import React, { Suspense } from 'react'
import { useEffect } from 'react'
import Loading from '../Loading'

function SaveRefCode() {
    const search = useSearchParams()
    const code = search.get('ref')

    useEffect(() => {
        if (code) {
            localStorage.setItem('referredBy', code)
        }
    }, [code])

    return (<Suspense fallback={<Loading />}><></></Suspense>)
}

export default SaveRefCode
