"use client"
import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { ADMIN } from '../constents/constArray'
import Loading from './Loading'
import axios from 'axios'
import NoData from './NoData'
import Image from 'next/image'

function Users() {
    const { status, data } = useSession()
    const user = data?.user || {}
    const isAdmin = user?.role === ADMIN
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        if (status === "authenticated" && isAdmin) {
            getList()
        } else if (status === "unauthenticated") {
            router.push("/")
        }
    }, [status])

    const getList = async () => {
        try {
            const res = await axios.get("/api/users")
            setList(res.data || [])
            setLoading(false)
        } catch (e) {
            console.log(e)
            toast.error(getError(e))
        }
    }

    return (<Layout title="Users">
        <div className="2xl:max-w-7xl xl:max-w-6xl max-w-[90%] mx-auto py-10">
            <div className="md:p-8 p-4 bg-white rounded-xl md:w-[70%] w-full mx-auto 2xl:min-h-[70vh] xl:min-h-[50vh] min-h-[60vh]">
                <table className='w-full overflow-x-auto'>
                    <thead>
                        <tr>
                            <th className='py-2 px-3'>#</th>
                            <th className='text-[#337AB7] text-end py-2 px-3'>Name
                                <input className='disabled:bg-gray-200 w-full py-1 px-3 rounded focus-visible:outline-none first-letter:capitalize text-gray-500 border border-input text-sm text-end font-normal' />
                            </th>
                            <th className='text-[#337AB7] text-end py-2 px-3'>Role
                                <input className='disabled:bg-gray-200 w-full py-1 px-3 rounded focus-visible:outline-none first-letter:capitalize text-gray-500 border border-input text-sm text-end font-normal' />
                            </th>
                            <th className='text-[#337AB7] text-end py-2 px-3'>Balance
                                <input className='disabled:bg-gray-200 w-full py-1 px-3 rounded focus-visible:outline-none first-letter:capitalize text-gray-500 border border-input text-sm text-end font-normal' />
                            </th>
                            {/* <th></th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {/* <tr>
                            <td></td>
                            <td>
                                <input />
                            </td>
                            <td>
                                <input />
                            </td>
                            <td>
                                <input />
                            </td>
                        </tr> */}

                        {loading ? <tr><td colSpan={5} className='text-center'><Loading /></td></tr> : (
                            (list && list.length > 0) ? list.map((e, index) => {
                                return <tr className={`${index % 2 === 0 ? "bg-[#F9F9F9]" : "bg-white"}`}>
                                    <td className='py-2 px-4'>{index + 1}</td>
                                    <td className='py-2 px-4'>rr</td>
                                    <td className='py-2 px-4'>{e.role}</td>
                                    <td className='py-2 px-4'>rr</td>
                                    <td className='py-2 px-4'>
                                        <div className='flex gap-2'>
                                            <button><Image src="/images/view.svg" alt='view' height={20} width={20} /></button>
                                            <button><Image src="/images/pencil.svg" alt='view' height={20} width={20} /></button>
                                            <button><Image src="/images/delete.svg" alt='view' height={20} width={20} /></button>
                                        </div>
                                    </td>
                                </tr>
                            }) : <NoData />
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    </Layout>)
}

export default Users
