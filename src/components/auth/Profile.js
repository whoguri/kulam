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

function Profile() {
  const { status, data } = useSession()
  const sessionUser = data?.user || {}
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const [open, setOpen] = useState(-1)
  const [sending, setSending] = useState(false)
  const { register, handleSubmit, setValue, watch, clearErrors, formState: { errors } } = useForm({})

  useEffect(() => {
    if (status === "authenticated") {
      getProfile()
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
      console.log(getError(error))
      setLoading(false)
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

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="2xl:max-w-7xl xl:max-w-6xl max-w-[90%] mx-auto py-10">
          <div className="md:p-8 p-4 bg-white rounded-xl md:w-[70%] w-full mx-auto 2xl:min-h-[70vh] xl:min-h-[50vh] min-h-[60vh]">
            <div className="flex md:flex-row flex-col-reverse md:items-start items-end md:justify-between w-full">
              <div className="md:mt-0 mt-5">
                <div>
                  <div className="capitalize md:text-xl text-base md:text-start text-end">
                    חבר החל מ
                  </div>
                  <div className="capitalize md:text-base text-sm md:text-start text-end">
                    {formatDate(user?.registerOn, "MMM yyyy")}
                  </div>
                  <div className="capitalize md:text-xl text-base md:text-start text-end mt-4">
                    ההכנסות שלי
                  </div>
                  <div className="capitalize md:text-base text-sm md:text-start text-end">
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
              </div>

              <div className="flex items-start gap-5 text-end md:w-auto w-full">
                <form className='grow' onSubmit={handleSubmit(onSubmit)} style={{ direction: "rtl" }}>
                  <div className="text-start capitalize grid md:grid-cols-2 grid-cols-1  md:gap-x-4 gap-x-2">
                    <Input label='Name' errors={errors} isRequired={true}
                      formProps={{ ...register("name", { required: true }) }} />
                    <Input label='Phone' errors={errors} isRequired={true}
                      formProps={{ ...register("phone", { required: true }) }} type='number' />
                    <Input label='City' errors={errors} isRequired={true}
                      formProps={{ ...register("city", { required: true }) }} />
                    <Input label='Social Id' errors={errors} isRequired={true}
                      formProps={{ ...register("socialId", { required: true }) }} />
                  </div>
                  <button disabled={sending} type='submit' className='disabled:pointer-events-none disabled:opacity-80 bg-primary px-4 py-1  border border-primary text-white rounded-md text-base uppercase hover:bg-white hover:text-primary font-semibold mt-4'>
                    {sending ? "Saving" : "Save"}
                  </button>
                </form>
                <Image
                  src={sessionUser?.image || "/images/user.png"}
                  alt="user"
                  height={150}
                  width={150}
                  className="border rounded-full 2xl:h-[100px] xl:h-20 2xl:w-[100px] xl:w-20 h-16 w-16"
                />
              </div>
            </div>
            <hr className="border-b border-black my-5" />
            <div>
              <h1 className="paragraph mb-2 text-end">חברים שהצטרפו דרכי</h1>
              {(user.tree || [])
                .sort((a, b) =>
                  a.referrals.length > b.referrals.length ? -1 : 1
                )
                .map((e, i) => (
                  <ReferralTree
                    index={i}
                    tree={e}
                    key={i}
                    isLast={user.tree.length - 1 === i}
                    open={open}
                    setOpen={setOpen}
                  />
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile