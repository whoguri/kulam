"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { formatDate } from 'date-fns'
import { useRouter } from 'next/navigation'
import { BASE_URL } from '@/constents/constArray'
import axios from 'axios'
import { getError } from 'helper'
import Loading from "../Loading"
import { toast } from 'react-toastify'
import ReferralTree from "./ReferralTree"
import Input from '../Input'
import { useForm } from 'react-hook-form'
import Pagination from "../Pagination"

let timeOut = null;

function Profile() {
  const { status, data } = useSession()
  const sessionUser = data?.user || {}
  const hasEmail = sessionUser?.email || ''
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [treeLoading, setTreeLoading] = useState(true)
  const router = useRouter()
  const [open, setOpen] = useState(-1)
  const [sending, setSending] = useState(false)
  const [treeData, setTreeData] = useState([])
  const [treeCount, setTreeCount] = useState(0)
  const [allCount, setAllCount] = useState(0)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(0)
  const limit = 20
  const { register, handleSubmit, setValue, watch, clearErrors, formState: { errors } } = useForm({})

  useEffect(() => {
    if (status === "authenticated") {
      getProfile()
      getTree(0)
      getTreeCount()
    } else if (status === "unauthenticated") {
      router.push("/")
    }
  }, [status])

  const getProfile = async () => {
    try {
      let res = await axios.get("/api/auth/profile")
      const data = res.data
      setUser(data)
      setValue("name", data.name)
      setValue("phone", data.phone)
      setValue("socialId", data.socialId)
      setValue("city", data.city)
      setLoading(false)
    } catch (error) {
      console.error(getError(error))
      setLoading(false)
    }
  }


  const getTree = async (p, s) => {
    try {
      let res = await axios.get(`/api/auth/tree?page=${p}&s=${s || ""}`)
      const data = res.data
      setTreeData(data || [])
      setTreeLoading(false)
    } catch (error) {
      console.error(getError(error))
      setTreeLoading(false)
    }
  }

  const getTreeCount = async (s) => {
    try {
      let res = await axios.get(`/api/auth/tree/count?s=${s || ""}`)
      const data = res.data
      setTreeCount(data || 0)
      if (!s) {
        setAllCount(data)
      }
    } catch (error) {
      console.error(getError(error))
    }
  }

  const onSubmit = async (data) => {
    try {
      setSending(true)
      let res = null;
      if (user?.id) {
        res = await axios.put("/api/auth/profile", data)
      }
      if (res.status === 200) {
        toast.success("Updated Successfully")
        getProfile()
        setSending(false)
      }
    } catch (error) {
      setSending(false)
      toast.error(getError(error))
    }
  }

  const searchData = (e) => {
    if (timeOut) {
      clearTimeout(timeOut)
    }
    setTreeLoading(true)

    timeOut = setTimeout(() => {
      setOpen(-1)
      if (e) {
        getTree(0, e.trim())
        getTreeCount(e.trim())
      } else {
        getTree(0)
        getTreeCount()
        setSearch("")
      }
    }, 500);
  }

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="2xl:max-w-7xl xl:max-w-6xl max-w-[90%] mx-auto py-10">
          <div className="md:p-8 p-4 bg-white rounded-xl md:w-[70%] w-full mx-auto 2xl:min-h-[70vh] xl:min-h-[50vh] min-h-[60vh]">
            <div className="md:grid md:grid-cols-2 flex  flex-col-reverse  w-full">
              <form className='md:w-auto w-full md:mt-0 mt-6' onSubmit={handleSubmit(onSubmit)} style={{ direction: "rtl" }}>
                <div className="text-start capitalize grid md:grid-cols-2 grid-cols-1  md:gap-x-4 gap-x-2">
                  <Input label='שם' errors={errors} isRequired={true}
                    formProps={{ ...register("name", { required: true }) }} />
                  <Input label='טלפון' errors={errors} isRequired={hasEmail ? false : true}
                    formProps={{ ...register("phone", { required: hasEmail ? false : true }) }} type='number' />
                  <Input label='עיר' errors={errors} isRequired={true}
                    formProps={{ ...register("city", { required: true }) }} />
                  <Input label='תעודת זהות' errors={errors} isRequired={false}
                    formProps={{ ...register("socialId", { required: false }) }} />
                </div>
                <button disabled={sending} type='submit' className='disabled:pointer-events-none disabled:opacity-80 bg-primary px-4 py-1  border border-primary text-white rounded-md text-base uppercase hover:bg-white hover:text-primary font-semibold mt-4'>
                  {sending ? "שומר.." : "שמירה"}
                </button>
              </form>

              <div className="flex md:flex-row flex-col-reverse items-start justify-end gap-5 text-end w-full">
                <div className=' md:w-auto w-full'>
                  <div className="capitalize md:text-xl text-base">
                    חבר החל מ
                  </div>
                  <div className="capitalize md:text-base text-sm">
                    {formatDate(user?.registerOn, "MMM yyyy")}
                  </div>
                  <div className="capitalize md:text-xl text-base mt-4">
                    ההכנסות שלי
                  </div>
                  <div className="capitalize md:text-base text-sm">
                    ₪2000
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        BASE_URL + "?ref=" + user?.referralCode
                      );
                      toast.success("Copied");
                    }}
                    className="md:text-base text-sm md:text-start text-end font-semibold text-[#0039CC] underline underline-offset-8 pt-1 whitespace-pre"
                  >
                    העתק קישור להזמנה
                  </button>
                </div>
                <div className='md:text-end text-center md:w-auto w-full'>
                  {sessionUser?.image ?
                    <Image
                      src={sessionUser?.image || "/images/user.svg"}
                      alt="user"
                      height={150}
                      width={150}
                      className="mx-auto border border-black rounded-full 2xl:h-[100px] xl:h-20 2xl:w-[100px] w-20 h-20"
                    />
                    :
                    <img
                      src={sessionUser?.image || "/images/user.svg"}
                      alt="user"
                      height={150}
                      width={150}
                      className="mx-auto border border-black rounded-full 2xl:h-[100px] xl:h-20 2xl:w-[100px] w-20 h-20"
                    />}
                  <div className='mt-4'>{user?.email || user?.userName}</div>
                </div>
              </div>
            </div>
            <hr className="border-b border-black my-5" />
            <div>
              <h1 className="paragraph mb-2 text-end"> <span className='h-6 min-w-6 rounded-full bg-gradient-to-r from-primary to-primary-dark me-2 inline-flex items-center justify-center px-1 py-1 text-white'>{allCount}</span> חברים שהצטרפו דרכי</h1>

              <div className="w-full mb-2 relative">
                <input type="text" value={search} className="text-end block py-3 ps-8 pe-4 border rounded-lg  w-full z-20 text-sm placeholder:text-light bg-transparent focus-visible:outline-none"
                  placeholder="Search..."
                  onChange={(e) => {
                    searchData(e.target.value)
                    setSearch(e.target.value)
                  }}
                />
                <span className="absolute text-center top-1/2 -translate-y-1/2 left-0 md:py-2 py-1 px-2 text-xs font-medium">
                  {search ? <svg className='w-5 h-5 cursor-pointer' onClick={async () => {
                    setSearch("")
                    setTreeLoading(true)
                    await getTreeCount()
                    await getTree(0)
                  }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 56 56"
                  >
                    <path
                      fill="currentColor"
                      d="M10.023 43.023c-.796.797-.82 2.157 0 2.954c.82.796 2.157.796 2.977 0l15-15l15 15c.797.796 2.156.82 2.977 0c.796-.82.796-2.157 0-2.954L30.953 28l15.024-15c.796-.797.82-2.156 0-2.953c-.844-.82-2.18-.82-2.977 0l-15 15l-15-15c-.82-.82-2.18-.844-2.977 0c-.796.82-.796 2.156 0 2.953l15 15Z"
                    />
                  </svg> : <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z">
                    </path>
                  </svg>}
                  <span className="sr-only">Search</span>
                </span>
              </div>
              {/*  .sort((a, b) =>
                 a.referrals.length > b.referrals.length ? -1 : 1
              ) */}

              <div className='min-h-[30vh] border-t'>
                {treeLoading ? <Loading style={{ height: "auto" }} /> : (treeData || []).map((e, i) => (
                  <ReferralTree
                    index={i}
                    tree={e}
                    key={e.id}
                    isLast={treeData.length - 1 === i}
                    open={open}
                    search={search.toLowerCase()}
                    setOpen={setOpen}
                  />
                ))}

                {treeLoading ? "" : <div style={{ direction: "rtl" }}>
                  {treeCount > 0 ? <Pagination isHide={true} count={treeCount}
                    limit={limit} page={page}
                    setPage={(p) => {
                      setPage(p)
                      getTree(p, search)
                      setOpen(-1)
                    }} /> : ""}
                </div>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile