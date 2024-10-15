import React from 'react'
import Layout from "../components/Layout"
import Link from 'next/link'
function NotFound() {
    return (<Layout title="404">
        <div className='h-[50vh] flex justify-center items-center flex-col text-lg font-medium'>
            <div>Page Not found (404)</div>
            <div>Sorry, the page you are looking for does not exist.</div>
            <div><Link href="/">Go to Home</Link></div>
        </div>
    </Layout>)
}

export default NotFound
