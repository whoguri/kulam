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
import { getError } from 'helper'
import SelectBox from './SelectBox'
import { formatDate } from 'date-fns'
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
    const [email, setEmail] = useState(null)
    const [role, setRole] = useState("")
    const [balance, setBalance] = useState("")
    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(10)
    const [count, setCount] = useState(0)
    const [sortBy, setSortBy] = useState("")

    useEffect(() => {
        if (status === "authenticated" && isAdmin) {
            getList(0, limit)
            getCount()
        } else if (status !== "loading") {
            router.push("/")
        }
    }, [status, role, sortBy])

    useEffect(() => {
        if (name !== null || email !== null) {
            if (timeout)
                clearTimeout(timeout)
            timeout = setTimeout(() => {
                getList(0, limit)
                getCount()
            }, 1000);
        }
    }, [name, email])

    const getCount = async () => {
        try {
            let url = `/api/users/count?`
            if (name) {
                url = url + "name=" + name + "&"
            }
            if (email) {
                url = url + "email=" + email + "&"
            }
            if (role) {
                url = url + "role=" + role + "&"
            }
            const res = await axios.get(url)
            setCount(res.data)
        } catch (e) {
            console.error(e)
        }
    }

    const getList = async (p, l) => {
        try {
            setLoading(true)
            setPage(p)
            setLimit(l)
            let url = `/api/users?limit=${l}&skip=${l * p}&`
            if (sortBy) {
                url = url + "orderBy=" + sortBy + "&"
            }
            if (name) {
                url = url + "name=" + name + "&"
            }
            if (email) {
                url = url + "email=" + email + "&"
            }
            if (role) {
                url = url + "role=" + role + "&"
            }
            const res = await axios.get(url)
            setList(res.data || [])
            setLoading(false)
        } catch (e) {
            console.error(e)
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
            <div className="md:p-8 p-4 bg-white rounded-xl w-full mx-auto 2xl:min-h-[70vh] xl:min-h-[50vh] min-h-[60vh]" style={{ direction: "rtl" }}>
                <div className='flex items-center justify-between w-full'>

                    <div className='text-base font-bold'>סה״כ : {count}</div>
                    <SelectBox defaultOption="מיון לפי:" onChange={(e) => {
                        setSortBy(e.target.value)
                    }} value={sortBy} >
                        {[
                            { title: "חדשים קודם - תאריך הצטרפות", value: "registerOn-d" },
                            { title: "ישנים קודם - תאריך הצטרפות", value: "registerOn-a" },
                            { title: "סיכום מנמוך לגבוה", value: "total-a" },
                            { title: "סיכום מגבוה לנמוך", value: "total-d" },
                            { title: "יתרה מנמוך לגבוה", value: "balance-a" },
                            { title: "יתרה מגבוה לנמוך", value: "balance-d" },
                            { title: "שם", value: "name" }].map((e, i) => {
                                return <option value={e.value} key={e.value}>{e.title}</option>
                            })}
                    </SelectBox>
                </div>
                <hr className='border-b border-gray-200 my-3' />

                <div className='w-full overflow-x-auto'>
                    <table className='md:w-full w-max'>
                        <thead>
                            <tr>
                                <th className='py-2 px-3 font-bold text-start align-top'>תעודת זהות</th>
                                <th className=' py-2 px-3 font-bold text-start'>שם
                                    <input className='text-start disabled:bg-gray-200 w-full py-1 px-3 rounded focus-visible:outline-none first-letter:capitalize text-gray-500 border border-input text-sm font-normal'
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value)
                                        }} />
                                </th>
                                <th className='py-2 px-3 font-bold text-start align-top'>Email
                                    <input className='text-start disabled:bg-gray-200 w-full py-1 px-3 rounded focus-visible:outline-none first-letter:capitalize text-gray-500 border border-input text-sm font-normal'
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value)
                                        }} />
                                </th>
                                <th className='py-2 px-3 font-bold text-start align-top'>City</th>
                                <th className='py-2 px-3 font-bold text-start '>Role
                                    <select className='disabled:bg-gray-200 w-full capitalize py-1 px-3 rounded focus-visible:outline-none first-letter:capitalize text-gray-500 border border-input text-sm font-normal'
                                        value={role}
                                        onChange={(e) => {
                                            setRole(e.target.value)
                                        }} >
                                        <option value={""} className="">הכל</option>
                                        {ROLES.map((e, i) => {
                                            return <option value={e.value} key={e.value} className="">{e.value}</option>
                                        })}
                                    </select>
                                </th>


                                <th className='py-2 px-3 font-bold text-start capitalize align-top md:w-[10%]'>הכנסות
                                    {/* <input className='disabled:bg-gray-200 w-full py-1 px-3 rounded focus-visible:outline-none first-letter:capitalize text-gray-500 border border-input text-sm font-normal'
                                        value={balance}
                                        onChange={(e) => {
                                            setBalance(e.target.value)
                                        }} /> */}
                                </th>
                                <th className='py-2 px-3 font-bold text-start capitalize align-top'>Total</th>
                                <th className='py-2 px-3 font-bold text-start capitalize align-top'>Joining Date</th>
                            </tr>
                        </thead>
                        <tbody>  {loading ? <tr><td colSpan={6} className='text-center'><Loading /></td></tr> : (
                            (list && list.length > 0) ? list.map((e, index) => {
                                const role = ROLES.find(el => el.value === e.role)
                                return <tr key={e.id} className={`${index % 2 === 0 ? "bg-[#F9F9F9]" : "bg-white"} cursor-pointer text-sm`} onClick={() => { setOpenUser(e.id) }}>
                                    <td className='py-2 px-3'>{e.socialId}</td>
                                    <td className='py-2 px-3 md:overflow-hidden'>{e.name}</td>
                                    <td className='py-2 px-3 md:overflow-hidden'>{e.email}</td>
                                    <td className='py-2 px-3'>{e.city}</td>
                                    <td className='py-2 px-3'>{role?.label}</td>
                                    <td className='py-2 px-3'>{e.balance}</td>
                                    <td className='py-2 px-3'>{e.total}</td>
                                    <td className='py-2 px-3'>{e.registerOn ? formatDate(e.registerOn, "dd/MM/yyyy") : ""}</td>
                                </tr>
                            }) : <tr><td colSpan={6} className='text-center'><NoData /></td></tr>
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
