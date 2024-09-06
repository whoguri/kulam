"use client"
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { Suspense } from 'react'

const Error_ = () => {
    const search = useSearchParams()
    const error = search.get('e')
    return <div className='h-[80vh] flex w-full flex-col justify-center items-center'>
        <div className='text-white text-center text-4xl mb-10'>
            {error === "AccessDenied" ? "Your account is inactive. Please Contact to your admin or try again" : "Something Went Wrong"}
        </div>
        <div className='text-center'>
            <Link href="/" className='text-2xl font-semibold underline hover:text-primary-dark text-white'>Go To Home</Link>
        </div>
    </div >
}
function Error() {
    return <Suspense fallback={<></>}>
        <Error_ />
    </Suspense>
}

export default Error
