"use client"
import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import { useSession } from 'next-auth/react'
import { ADMIN, ROLES } from '../constents/constArray'
import Loading from './Loading'
import NoData from './NoData'
import Image from 'next/image'
import UserModal from "./UserModal"
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-toastify'
import Pagination from "./Pagination"
let timeout = null

function Users() {
    const { status, data } = useSession()
    const user = data?.user || {}
    const isAdmin = user?.role === ADMIN
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [openUser, setOpenUser] = useState(false)
    const router = useRouter()
    const [name, setName] = useState(null)
    const [role, setRole] = useState("")
    const [balance, setBalance] = useState("")
    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(10)
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (status === "authenticated" && isAdmin) {
            getList(0, limit)
            getCount()
        } else if (status !== "loading") {
            router.push("/")
        }
    }, [status, role])

    useEffect(() => {
        if (name !== null) {
            if (timeout)
                clearTimeout(timeout)
            timeout = setTimeout(() => {
                getList(0, limit)
                getCount()
            }, 1000);
        }
    }, [name])

    const getCount = async () => {
        try {
            let url = `/api/users/count?`
            if (name) {
                url = url + "name=" + name + "&"
            }
            if (role) {
                url = url + "role=" + role + "&"
            }
            const res = await axios.get(url)
            setCount(res.data)
        } catch (e) {
            console.log(e)
        }
    }

    const getList = async (p, l) => {
        try {
            setLoading(true)
            setPage(p)
            setLimit(l)
            let url = `/api/users?limit=${l}&skip=${l * p}&`
            if (name) {
                url = url + "name=" + name + "&"
            }
            if (role) {
                url = url + "role=" + role + "&"
            }
            const res = await axios.get(url)
            setList(res.data || [])
            setLoading(false)
        } catch (e) {
            console.log(e)
            toast.error(getError(e))
        }
    }

    // if (status === "loading") {
    //     return <Loading />
    // }

    return (<Layout title="Users">
        {openUser && <UserModal
            id={openUser}
            onClose={() => {
                setOpenUser(false)
            }}
            onSave={() => { getList(page, limit) }}
        />}
        <div className="2xl:max-w-7xl xl:max-w-6xl max-w-[90%] mx-auto py-10">
            <div className="md:p-8 p-4 bg-white rounded-xl md:w-[70%] w-full mx-auto 2xl:min-h-[70vh] xl:min-h-[50vh] min-h-[60vh]" style={{ direction: "rtl" }}>
                <div className='w-full overflow-x-auto'>
                    <table className='md:w-full w-max'>
                        <thead>
                            <tr>
                                <th className='py-2 px-3 font-bold text-start'>#</th>
                                <th className='text-[#337AB7] py-2 px-3 font-bold text-start '>Name
                                    <input className='text-start disabled:bg-gray-200 w-full py-1 px-3 rounded focus-visible:outline-none first-letter:capitalize text-gray-500 border border-input text-sm font-normal'
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value)
                                        }} />
                                </th>
                                <th className='text-[#337AB7] py-2 px-3 font-bold text-start'>Role
                                    <select className='disabled:bg-gray-200 w-full capitalize py-1 px-3 rounded focus-visible:outline-none first-letter:capitalize text-gray-500 border border-input text-sm font-normal'
                                        value={role}
                                        onChange={(e) => {
                                            setRole(e.target.value)
                                        }} >
                                        <option value={""} className="">All</option>
                                        {ROLES.map((e, i) => {
                                            return <option value={e} key={e} className="">{e}</option>
                                        })}
                                    </select>
                                </th>
                                <th className='text-[#337AB7] py-2 px-3 font-bold text-start capitalize'>total earning
                                    {/* <input className='disabled:bg-gray-200 w-full py-1 px-3 rounded focus-visible:outline-none first-letter:capitalize text-gray-500 border border-input text-sm font-normal'
                                        value={balance}
                                        onChange={(e) => {
                                            setBalance(e.target.value)
                                        }} /> */}
                                </th>
                                <th className=''></th>
                                <th className=''></th>
                                <th className=''></th>
                                <th className=''></th>
                                <th className=''></th>
                                <th className=''></th>

                            </tr>
                        </thead>
                        <tbody>  {loading ? <tr><td colSpan={5} className='text-center'><Loading /></td></tr> : (
                            (list && list.length > 0) ? list.map((e, index) => {
                                return <tr className={`${index % 2 === 0 ? "bg-[#F9F9F9]" : "bg-white"} text-sm`}>
                                    <td className='py-2 px-3'>{(page * limit) + (index + 1)}</td>
                                    <td className='py-2 px-3'>{e.socialId}</td>
                                    <td className='py-2 px-3'>{e.name}</td>
                                    <td className='py-2 px-3'>{e.email}</td>
                                    <td className='py-2 px-3'>{e.phone}</td>
                                    <td className='py-2 px-3'>{e.city}</td>
                                    <td className='py-2 px-3'>{e.role}</td>
                                    <td className='py-2 px3'>0</td>
                                    <td className='py-2 px-3'>
                                        <div className='flex gap-2'>
                                            {/* <button><Image src="/images/view.svg" alt='view' height={20} width={20} /></button> */}
                                            <button
                                                onClick={() => {
                                                    setOpenUser(e.id)
                                                }}>

                                                <Image src="/images/pencil.svg" alt='view' height={20} width={20} className='h-5 w-5' /></button>

                                            {/* <button><Image src="/images/delete.svg" alt='view' height={20} width={20} /></button> */}
                                        </div>
                                    </td>
                                </tr>
                            }) : <tr><td colSpan={5} className='text-center'><NoData /></td></tr>
                        )}
                        </tbody>
                    </table>
                </div>
                <Pagination count={count} limit={limit} page={page} setLimit={(l) => {
                    getList(0, l)
                }}
                    setPage={(p) => {
                        getList(p, limit)
                    }}
                />
            </div>
        </div>
    </Layout>)
}

export default Users
