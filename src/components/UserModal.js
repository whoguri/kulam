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
    const { register, handleSubmit, setValue, watch, clearErrors, formState: { errors } } = useForm({})

    useEffect(() => {
        if (id)
            getUser()
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

    return (<Modal title="User" maxWidth="max-w-[800px]" onClose={onClose}>
        {loading ? <Loading /> :
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid md:grid-cols-4 grid-cols-1 gap-3">
                    <Input label="Name"
                        formProps={{ ...register("name", { required: true }) }} isRequired={true} errors={errors} clearErrors={clearErrors} />

                    <Input label="תעודת זהות"
                        formProps={{ ...register("socialId", { required: false }) }} isRequired={false} errors={errors} clearErrors={clearErrors} />

                    <Input label="מייל" type="email" disabled={watch("email")}
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

                <div className="flex justify-end items-end">
                    <button disabled={sending} type='submit' className='bg-primary px-4 py-2 border border-primary text-white rounded-md text-xl uppercase hover:bg-white hover:text-primary font-semibold'>
                        {sending ? "Saving" : "Save"}
                    </button>
                </div>
            </form>}
    </Modal>)
}