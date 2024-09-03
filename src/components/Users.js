"use client"
import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import { useSession } from 'next-auth/react'
import { ADMIN } from '../constents/constArray'
import Loading from './Loading'
import NoData from './NoData'
import Image from 'next/image'
import UserModal from "./UserModal"
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-toastify'

function Users() {
    const { status, data } = useSession()
    const user = data?.user || {}
    const isAdmin = user?.role === ADMIN
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [openUser, setOpenUser] = useState(false)
    const router = useRouter()
    const [name, setName] = useState("")
    const [role, setRole] = useState("")
    const [balance, setBalance] = useState("")


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

    if (status === "loading") {
        return <Loading />
    }

    return (<Layout title="Users">

        {openUser && <UserModal
            id={openUser}
            onClose={() => {
                setOpenUser(false)
            }}
            onSave={() => { getList() }}
        />}

        <div className="2xl:max-w-7xl xl:max-w-6xl max-w-[90%] mx-auto py-10">
            <div className="md:p-8 p-4 bg-white rounded-xl md:w-[70%] w-full mx-auto 2xl:min-h-[70vh] xl:min-h-[50vh] min-h-[60vh]">
                <div className='w-full overflow-x-auto'>
                    <table className='w-full'>
                        <thead>
                            <tr>
                                {/* <th className='py-2 px-3'>#</th> */}
                                {/* <th className='text-[#337AB7] text-end py-2 px-3 '>Name
                                    <input className='disabled:bg-gray-200 w-full py-1 px-3 rounded focus-visible:outline-none first-letter:capitalize text-gray-500 border border-input text-sm text-end font-normal'
                                        value={name}
                                        onChange={(e) => {
                                            setError("")
                                            setName(e.target.value)
                                        }} />
                                </th> */}
                                {/* <th className='text-[#337AB7] text-end py-2 px-3'>Role
                                    <input className='disabled:bg-gray-200 w-full py-1 px-3 rounded focus-visible:outline-none first-letter:capitalize text-gray-500 border border-input text-sm text-end font-normal'
                                        value={role}
                                        onChange={(e) => {
                                            setError("")
                                            setRole(e.target.value)
                                        }} />
                                </th> */}
                                {/* <th className='text-[#337AB7] text-end py-2 px-3'>Balance
                                    <input className='disabled:bg-gray-200 w-full py-1 px-3 rounded focus-visible:outline-none first-letter:capitalize text-gray-500 border border-input text-sm text-end font-normal'
                                        value={balance}
                                        onChange={(e) => {
                                            setError("")
                                            setBalance(e.target.value)
                                        }} />
                                </th> */}
                                {/* <th className=''></th> */}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='py-2 px-3 font-bold'>#</td>
                                <td className='text-[#337AB7] text-end py-2 px-3 font-bold'>Name
                                    <input className='disabled:bg-gray-200 w-full py-1 px-3 rounded focus-visible:outline-none first-letter:capitalize text-gray-500 border border-input text-sm text-end font-normal'
                                        value={name}
                                        onChange={(e) => {
                                            setError("")
                                            setName(e.target.value)
                                        }} />
                                </td>
                                <td className='text-[#337AB7] text-end py-2 px-3 font-bold'>Role
                                    <input className='disabled:bg-gray-200 w-full py-1 px-3 rounded focus-visible:outline-none first-letter:capitalize text-gray-500 border border-input text-sm text-end font-normal'
                                        value={role}
                                        onChange={(e) => {
                                            setError("")
                                            setRole(e.target.value)
                                        }} />
                                </td>
                                <td className='text-[#337AB7] text-end py-2 px-3 font-bold'>Balance
                                    <input className='disabled:bg-gray-200 w-full py-1 px-3 rounded focus-visible:outline-none first-letter:capitalize text-gray-500 border border-input text-sm text-end font-normal'
                                        value={balance}
                                        onChange={(e) => {
                                            setError("")
                                            setBalance(e.target.value)
                                        }} />
                                </td>
                            </tr>

                            {loading ? <tr><td colSpan={5} className='text-center'><Loading /></td></tr> : (
                                (list && list.length > 0) ? list.map((e, index) => {
                                    return <tr className={`${index % 2 === 0 ? "bg-[#F9F9F9]" : "bg-white"} text-sm`}>
                                        <td className='py-2 px-3'>{index + 1}</td>
                                        <td className='py-2 px-3'>{e.name}</td>
                                        <td className='py-2 px-3'>{e.role}</td>
                                        <td className='py-2 px3'>rr</td>
                                        <td className='py-2 px-3'>
                                            <div className='flex gap-2'>

                                                <button><Image src="/images/view.svg" alt='view' height={20} width={20} /></button>

                                                <button
                                                    onClick={() => {
                                                        setOpenUser(e.id)
                                                    }}>

                                                    <Image src="/images/pencil.svg" alt='view' height={20} width={20} /></button>

                                                {/* <button><Image src="/images/delete.svg" alt='view' height={20} width={20} /></button> */}
                                            </div>
                                        </td>
                                    </tr>
                                }) : <tr><td colSpan={5} className='text-center'><NoData /></td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </Layout>)
}

export default Users
