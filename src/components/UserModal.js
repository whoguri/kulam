import { use, useEffect, useState } from "react"
import Input from "./Input"
import Loading from "./Loading"
import axios from "axios"
import { toast } from "react-toastify"
import Modal from "./Modal"
import { useForm } from "react-hook-form"
import SelectBox from "./SelectBox"
import { ROLES, STATUS } from "@/constents/constArray"
import { getError } from "helper"
import NoData from "./NoData"
import { addMonths, endOfDay, formatDate, subDays } from "date-fns"
import { useSession } from "next-auth/react"
import { type } from "os"

export default function UserModal({ onSave, onClose, id }) {
    const [loading, setLoading] = useState(true)
    const { data } = useSession()
    const [sending, setSending] = useState(false)
    const [paySending, setPaySending] = useState(false)
    const [pays, setPays] = useState(false)
    // const user = data?.user || {}
    const { register, handleSubmit, setValue, watch, clearErrors, formState: { errors } } = useForm({})
    const [email, setEmail] = useState("")

    useEffect(() => {
        if (id) {
            getUser()
            getPays()
        }
    }, [id])

    const getUser = async () => {
        try {
            const res = await axios.get("/api/users/" + id)
            const data = res.data
            Object.keys(data).forEach((e) => {
                if (e !== "id") {
                    setValue(e, data[e])
                }
            })
            setEmail(data.email)
            setLoading(false)
        } catch (e) {
            console.error(e)
            toast.error(getError(e))
            // setLoading(false)
        }
    }

    const getPays = async () => {
        try {
            const payRes = await axios.get("/api/users/" + id + "/pays")
            setPays(payRes.data)
        } catch (error) {
            console.error(e)
            toast.error(getError(e))
        }
    }

    const onSubmit = async (data) => {
        try {
            setSending(true)
            delete data.subscriptions
            const res = await axios.put("/api/users/" + id, data)
            if (res.status === 200) {
                toast.success("Updated Successfully")
                onSave()
                onClose()
                // setSending(false)
            }
            else {
                toast.error("Something went wrong")
                setSending(false)
            }
        } catch (error) {
            setSending(false)
            toast.error(getError(error))
        }
    }

    const markPaid = async () => {
        const b = confirm("Are you sure to mark this as paid?")
        if (b) {
            try {
                setPaySending(true)
                const res = await axios.post("/api/users/" + id + "/paid", {})
                if (res.status === 201) {
                    toast.success("Updated Successfully")
                    getUser()
                    getPays()
                }
                else {
                    toast.error("Something went wrong")
                    setPaySending(false)
                }
            } catch (error) {
                setPaySending(false)
                toast.error(getError(error))
            }
        }
    }
    const registerOn = watch("registerOn")
    const subscription = (watch("subscriptions") || [])[0]
    const cancelSubscription = async () => {
        try {
            let yes = confirm("Are you sure to cancel subscriptions?")
            if (yes) {
                setSending(true)
                let res = await axios.delete(`/api/users/${id}/subscription`)
                toast.success("Subscription Cancelled")
                setSending(false)
                getUser()
            }
        } catch (error) {
            setSending(false)
            toast.error(getError(error))
        }
    }
    const startSubscription = async () => {
        try {
            let yes = confirm("האם להרשם כחבר?")
            if (yes) {
                setSending(true)
                let expiry = null
                let amount = null
                let type = "MONTHLY"
                if (type === "MONTHLY") {
                    expiry = endOfDay(addMonths(new Date(), 1))
                    amount = 0//prices.amountMonth
                } else {
                    expiry = endOfDay(addYears(new Date(), 1))
                    amount = 0//prices.amountYear
                }
                expiry = subDays(expiry, 1)

                let res = await axios.post(`/api/users/${id}/subscription`, { date: new Date(), amount, expiry, type })
                toast.success("Subscription Cancelled")
                setSending(false)
                getUser()
            }
        } catch (error) {
            setSending(false)
            toast.error(getError(error))
        }
    }
    return (<Modal title="פרטי משתמש" maxWidth="max-w-[800px]" onClose={onClose}>
        {loading ? <Loading /> : <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid md:grid-cols-4 grid-cols-1 gap-3">
                    <Input label="שם משתמש"
                        formProps={{ ...register("name", { required: true }) }} isRequired={true} errors={errors} clearErrors={clearErrors} />

                    <Input label="תעודת זהות"
                        formProps={{ ...register("socialId", { required: false }) }} isRequired={false} errors={errors} clearErrors={clearErrors} />

                    <Input label="מייל" type="email" disabled={email}
                        formProps={{ ...register("email", { required: false }) }} isRequired={false} errors={errors} clearErrors={clearErrors} />

                    <Input label="טלפון"
                        formProps={{ ...register("phone", { required: false }) }} isRequired={false} errors={errors} clearErrors={clearErrors} />

                    <SelectBox label="סטאטוס" clearErrors={clearErrors}
                        formProps={{ ...register("status", { required: true }) }} isRequired={true} errors={errors}>
                        {STATUS.map((e, i) => {
                            return <option value={e.value} key={e.value} className="capitalize">{e.label}</option>
                        })}
                    </SelectBox>

                    <Input label="עיר"
                        formProps={{ ...register("city", { required: true, }) }} isRequired={true} errors={errors} clearErrors={clearErrors} />

                    <SelectBox label="תפקיד" clearErrors={clearErrors}
                        formProps={{ ...register("role", { required: true }) }} isRequired={true} errors={errors}>
                        {ROLES.map((e, i) => {
                            return <option value={e.value} key={e.value} className="capitalize">{e.label}</option>
                        })}
                    </SelectBox>

                </div>
                <div className="flex items-end my-5">
                    <button disabled={sending} type='submit' className='bg-primary px-4 py-1 border border-primary text-white rounded-md text-base uppercase hover:bg-white hover:text-primary font-semibold'>
                        {sending ? "שומר.." : "שמירה"}
                    </button>
                </div>
                <hr className='border-b border-gray-200 mt-4' />
                <div className="flex justify-between items-center mt-4 p-4 border-grey border rounded-lg bg-gray-100 ">
                    <div className="">
                        {subscription ? `Active subscription ${formatDate(subscription?.date, "dd/MM/yyyy")} - ${formatDate(subscription?.expiry, "dd/MM/yyyy")} ${subscription?.isAutoRenew ? "(חידוש אוטומטי)" : "(ללא חידוש אוטומטי)"}` : " פעיל ללא מנוי"}
                    </div>
                    {<button
                        disabled={sending}
                        type="button"
                        onClick={() => {
                            if (subscription)
                                cancelSubscription()
                            else
                                startSubscription()
                        }}
                        className="disabled:pointer-events-none disabled:opacity-80 bg-primary px-4 py-1  border border-primary text-white rounded-md text-base uppercase hover:bg-white hover:text-primary font-semibold "
                    >
                        {subscription ? "ביטול" : "הרשמה ל"}מנוי
                    </button>}

                </div>
                <hr className='border-b border-gray-200 mt-4' />

                <div className="flex items-start justify-between w-ful my-5">
                    <div className="flex items-center md:flex-nowrap flex-wrap md:gap-20 gap-4">
                        {registerOn && <div>
                            <div className="text-sm font-bold">תאריך הצטרפות</div>
                            <span className="text-base">{formatDate(registerOn, "dd/MM/yyyy")}</span>
                        </div>}

                        <div>
                            <div className="text-sm font-bold">יתרה</div>
                            <span className="text-base">{watch("balance") || 0}</span>
                        </div>

                        <div>
                            <div className="text-sm font-bold">סה״כ</div>
                            <span className="text-base">{watch("total") || 0}</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-end gap-5">
                        <div className="flex justify-end items-end">
                            <button type="button" disabled={paySending} onClick={markPaid} className='disabled:pointer-events-none disabled:bg-gray-400 disabled:border-gray-400 bg-background px-2 py-1 border border-background text-white rounded-md text-base uppercase hover:bg-white hover:text-background font-semibold'>שנה לשולם </button>
                        </div>
                    </div>
                </div>
            </form>

            <div className="pb-8" >
                <div className='w-full overflow-x-auto'>
                    <table className='md:w-full w-max'>
                        <thead>
                            <tr>
                                <th className='py-2 px-3 font-bold text-start align-top text-sm border border-gray-300'>סוג
                                </th>
                                <th className='py-2 px-3 font-bold text-start align-top text-sm border border-gray-300'>תאריך</th>
                                <th className='py-2 px-3 font-bold text-start align-top text-sm border border-gray-300'>סך</th>
                                <th className='py-2 px-3 font-bold text-start align-top text-sm border border-gray-300'>פרטים</th>
                            </tr>
                        </thead>
                        <tbody> {(pays && pays.length > 0) ? pays.map((e, index) => {
                            return <tr key={e.id} className={`${index % 2 === 0 ? "bg-[#F9F9F9]" : "bg-white"} cursor-pointer text-sm`}>
                                <td className='py-2 px-3 md:overflow-hidden border border-gray-300'>{e.type === "EARN" ? "הכנסה" : "משיכה"}</td>
                                <td className='py-2 px-3 border border-gray-300'>{formatDate(Date(), "dd/MM/yyyy")}</td>
                                <td className='py-2 px-3 md:overflow-hidden border border-gray-300'>{e.amount}</td>
                                <td className='py-2 px-3 md:overflow-hidden border border-gray-300'>{e.details}</td>
                            </tr>
                        }) : <tr><td colSpan={4} className='text-center'><NoData /></td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        </>}
    </Modal>)
}