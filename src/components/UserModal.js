import { useEffect, useState } from "react"
import Input from "./Input"
import Loading from "./Loading"
import axios from "axios"
import { toast } from "react-toastify"
import Modal from "./Modal"
import { useForm } from "react-hook-form"
import SelectBox from "./SelectBox"
import { ROLES, STATUS } from "@/constents/constArray"
import { getError } from "helper"

export default function UserModal({ onSave, onClose, id }) {
    const [loading, setLoading] = useState(true)
    const [sending, setSending] = useState(false)
    const [paySending, setPaySending] = useState(false)
    const [pays, setPays] = useState(false)
    const { register, handleSubmit, setValue, watch, clearErrors, formState: { errors } } = useForm({})
    const [email, setEmail] = useState("")

    useEffect(() => {
        if (id) {
            getUser()
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
            const payRes = await axios.get("/api/users/" + id + "/pays")
            setPays(payRes.data)
            setLoading(false)
        } catch (e) {
            console.error(e)
            toast.error(getError(e))
            // setLoading(false)
        }
    }

    const onSubmit = async (data) => {
        try {
            setSending(true)
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

    const markedPaid = async () => {
        try {
            setPaySending(true)
            const res = await axios.post("/api/users/" + id + "/paid", {})
            if (res.status === 201) {
                toast.success("Updated Successfully")
                setPaySending(false)
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

    return (<Modal title="User" maxWidth="max-w-[800px]" onClose={onClose}>
        {loading ? <Loading /> :
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid md:grid-cols-4 grid-cols-1 gap-3">
                    <Input label="Name"
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

                    <div className="mt-1">
                        <div className="text-sm font-bold pb-1">Joining Date</div>
                        <div className="relative">
                            <div className="disabled:bg-gray-200 w-full py-[18px] px-3 rounded-xl focus-visible:outline-none first-letter:capitalize placeholder:capitalize border border-input text-sm"></div>
                        </div>
                    </div>
                    <Input label="Balance"
                        formProps={{ ...register("balance", { required: false }) }} isRequired={false} errors={errors} clearErrors={clearErrors} type="number" />


                    <Input label="Total"
                        formProps={{ ...register("total", { required: false }) }} isRequired={false} errors={errors} clearErrors={clearErrors} type="number" />
                </div>

                <div className="flex items-center justify-end gap-5">
                    <div className="flex justify-end items-end">
                        <button type="button" disabled={paySending} onClick={markedPaid} className='disabled:pointer-events-none bg-primary px-4 py-2 border border-primary text-white rounded-md text-xl uppercase hover:bg-white hover:text-primary font-semibold'>
                            Marked paid
                        </button>
                    </div>
                    <div className="flex justify-end items-end">
                        <button disabled={sending} type='submit' className='bg-primary px-4 py-2 border border-primary text-white rounded-md text-xl uppercase hover:bg-white hover:text-primary font-semibold min-w-[150px]'>
                            {sending ? "Saving" : "Save"}
                        </button>
                    </div>









                    {/* <div className='w-full overflow-x-auto'>
                        <table className='md:w-full w-max'>
                            <thead>
                                <tr>
                                    <th className='py-2 px-3 font-bold text-start align-top'>Position </th>
                                    <th className='py-2 px-3 font-bold text-start align-top'>Name </th>
                                    <th className='py-2 px-3 font-bold text-start align-top'>Phone </th>
                                    <th className='py-2 px-3 font-bold text-start align-top'>identity card
                                    </th>

                                    <th className='py-2 px-3 font-bold text-start align-top'>Email</th>
                                    <th className='py-2 px-3 font-bold text-start align-top'>City</th>

                                    <th className='py-2 px-3 font-bold text-start capitalize align-top'>Total</th>
                                    <th className='py-2 px-3 font-bold text-start capitalize align-top'>Joining Date</th>
                                    <th className='py-2 px-3 font-bold text-start capitalize align-top'>Balance</th>
                                </tr>
                            </thead>
                            <tbody>  {loading ? <tr><td colSpan={6} className='text-center'><Loading /></td></tr> : (
                                (pays && pays.length > 0) ? pays.map((e, index) => {
                                    const role = ROLES.find(el => el.value === e.role)
                                    return <tr key={e.id} className={`${index % 2 === 0 ? "bg-[#F9F9F9]" : "bg-white"} cursor-pointer text-sm`} onClick={() => { setOpenUser(e.id) }}>
                                        <td className='py-2 px-3'>{e.socialId}</td>
                                        <td className='py-2 px-3 md:overflow-hidden'>{e.name}</td>
                                        <td className='py-2 px-3 md:overflow-hidden'>{e.email}</td>
                                        <td className='py-2 px-3'>{e.city}</td>
                                        <td className='py-2 px-3'>{role?.label}</td>
                                        <td className='py-2 px-3'>0</td>
                                        <td className='py-2 px-3'>0</td>
                                        <td className='py-2 px-3'>{formatDate(user.registerOn, "dd/MM/yyyy")}</td>
                                    </tr>
                                }) : <tr><td colSpan={6} className='text-center'><NoData /></td></tr>
                            )}
                            </tbody>
                        </table>
                    </div> */}
                </div>
            </form>}

    </Modal>)
}