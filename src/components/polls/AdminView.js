import { ADMIN } from '@/constents/constArray'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Pagination from '../Pagination'
import Layout from '../Layout'
import AddPollModal from "./AddPollModal"
import NoData from '../NoData'
import { getError } from 'helper'
import Loading from '../Loading'

function AdminView() {
    const { status, data } = useSession()
    const user = data?.user || {}
    const isAdmin = user?.role === ADMIN
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [openModal, setOpenModal] = useState(false)
    const [selId, setSelId] = useState("")
    const router = useRouter()
    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(10)
    const [count, setCount] = useState(0)
    const [isExpanded, setIsExpanded] = useState(-1)

    useEffect(() => {
        if (status === "authenticated") {
            getList(0, limit)
            getCount()
        }
    }, [status])


    const getCount = async () => {
        try {
            let url = `/api/polls/count?`
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
            let url = `/api/polls?limit=${l}&skip=${l * p}&`
            const res = await axios.get(url)
            setList(res.data || [])
            setLoading(false)
        } catch (e) {
            console.error(e)
            toast.error(getError(e))
        }
    }


    return <Layout title="Polls" buttonTitle="Add" onClickButton={() => {
        setSelId("")
        setOpenModal(true)
    }}>
        {openModal && <AddPollModal
            id={selId}
            onClose={() => {
                setSelId("")
                setOpenModal(false)
            }}
            onSave={() => { getList(0, limit) }}
        />}
        <div className="2xl:max-w-7xl xl:max-w-6xl max-w-[90%] mx-auto py-10">
            {loading ? <Loading /> : <div className="md:p-8 p-4 bg-white rounded-xl md:w-[70%] w-full mx-auto 2xl:min-h-[70vh] xl:min-h-[50vh] min-h-[60vh]" >
                {(list && list.length > 0) ? <>
                    <div className='w-full overflow-x-auto'>
                        {list.map((e, i) => {
                            return <Item e={e} key={i} onEdit={(id) => {
                                setSelId(e.id)
                                setOpenModal(true)
                            }} toggleExpand={() => {
                                if (isExpanded === i) {
                                    setIsExpanded(-1)
                                } else {
                                    setIsExpanded(i)
                                }
                            }} isExpanded={isExpanded === i} />
                        })}
                    </div>

                    <div style={{ direction: "rtl" }}>
                        <Pagination count={count} limit={limit} page={page} setLimit={(l) => {
                            getList(0, l)
                        }}
                            setPage={(p) => {
                                getList(p, limit)
                            }}
                        />
                    </div>
                </> : <NoData />}
            </div>}
        </div>
    </Layout>
}

export default AdminView

const Item = ({ e, onEdit, isExpanded, toggleExpand }) => {
    const length = e.answer.length
    return <div className="p-4 border-b  text-end">
        <div className='flex justify-between'>
            <button type="button" onClick={toggleExpand}>
                <svg className={`transition-all ${isExpanded ? "rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256">
                    <path fill="currentColor" d="m216.49 104.49l-80 80a12 12 0 0 1-17 0l-80-80a12 12 0 0 1 17-17L128 159l71.51-71.52a12 12 0 0 1 17 17Z" />
                </svg>
            </button>
            <div className='flex gap-4 justify-end items-center'>
                <button type="button" className="inline-flex justify-center items-center p-1 rounded-lg border border-primary-dark text-primary-dark 2xl:text-base text-sm"
                    onClick={() => {
                        onEdit(e.id)
                    }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" width="1em" height="1em" viewBox="0 0 36 36"><path fill="currentColor" d="M33.87 8.32L28 2.42a2.07 2.07 0 0 0-2.92 0L4.27 23.2l-1.9 8.2a2.06 2.06 0 0 0 2 2.5a2 2 0 0 0 .43 0l8.29-1.9l20.78-20.76a2.07 2.07 0 0 0 0-2.92M12.09 30.2l-7.77 1.63l1.77-7.62L21.66 8.7l6 6ZM29 13.25l-6-6l3.48-3.46l5.9 6Z" className="clr-i-outline clr-i-outline-path-1" /><path fill="none" d="M0 0h36v36H0z" /></svg>
                </button>
                <h2 className="text-xl font-bold">{e.question}</h2>
            </div>
        </div>
        {isExpanded && <div className="py-2">
            {e.options.map((o, i) => {
                let n = e.answer.filter(an => an.option === o).length
                if (n)
                    n = (n / length) * 100
                return <div key={i} className='mb-3'>
                    <div className="flex gap-4 items-statr justify-end">
                        <div className='w-full'>
                            <h2 className="paragraph">{o}</h2>
                            <div>
                                <div className='h-2 bg-background rounded-full overflow-hidden'>
                                    <div className='me-0 ms-auto h-full bg-gradient-to-r from-primary to-primary-dark '
                                        style={{ width: `${n}%` }} />
                                </div>
                            </div>
                        </div>
                        <div className='min-w-10 paragraph'>
                            {Math.round(n)}%
                        </div>
                    </div>
                </div>
            })}
        </div>}
    </div>
}