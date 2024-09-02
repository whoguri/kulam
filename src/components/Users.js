"use client"
import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { ADMIN } from '../constents/constArray'
import Loading from './Loading'
import axios from 'axios'

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
                <table className='w-full'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Balance</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
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
                        </tr>

                        {loading ? <tr><td colSpan={5} className='text-center'><Loading /></td></tr> : (
                            (list && list.length > 0) ? list.map((e, i) => {
                                return <tr>
                                    <td>{i + 1}</td>
                                    <td></td>
                                    <td>{e.role}</td>
                                    <td></td>
                                    <td>
                                        <div className='flex gap-2'>
                                            <button>view</button>
                                            <button>edit</button>
                                            <button>delete</button>
                                        </div>
                                    </td>
                                </tr>
                            }) : "no data"
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    </Layout>)
}

export default Users
