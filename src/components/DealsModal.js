import axios from "axios"
import { getError } from "helper"
import { useEffect, useState } from "react"
import Modal from "./Modal"
import HtmlEditor from "./HtmlEditor"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import Input from "../components/Input"

export default function DealsModal({ onSave, onClose, id }) {
    const [loading, setLoading] = useState(false)
    const [sending, setSending] = useState(false)
    const { register, handleSubmit, setValue, watch, clearErrors, formState: { errors } } = useForm({})

    useEffect(() => {
        if (id)
            getDeals()
        else
            setLoading(false)
    }, [id])

    const getDeals = async () => {
        try {
            const res = await axios.get("/api/deals/" + id)
            const data = res.data
            Object.keys(data || {}).forEach((e) => {
                if (e !== "id") {
                    setValue(e, data[e])
                }
            })
            setLoading(false)
        } catch (e) {
            console.log(e)
            toast.error(getError(e))
            // setLoading(false)
        }
    }

    const onSubmit = async (data) => {
        try {
            setSending(true)
            let res = null;
            if (id) {
                res = await axios.put("/api/deals/" + id, data)
            } else {
                res = await axios.post("/api/deals", data)
            }
            if (res.status === 200) {
                toast.success("Updated Successfully")
                onSave()
                onClose()
                setSending(false)
            }
        } catch (error) {
            setSending(false)
            toast.error(getError(error))
        }
    }


    if (loading) {
        return <div className="text-primary text-4xl font-medium h-[calc(100vh-72px)] flex items-center justify-center">Loading....</div>
    }

    return (<Modal title="Service" maxWidth="max-w-[800px]" onClose={onClose}>

        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-3">
                <Input label="Name"
                    formProps={{ ...register("name", { required: true }) }} isRequired={true} errors={errors} />

                <Input label="Amount" formProps={{ ...register("amount", { required: true, valueAsNumber: true }) }}
                    isRequired={true} errors={errors} type="number" />
            </div>
            <div className="my-6">
                <HtmlEditor isRequired={true} label="Description" value={watch("description")} setValue={setValue}
                    formProps={{ ...register("description", { required: true }) }} errors={errors} clearErrors={clearErrors} />
            </div>
            <div className="flex justify-end items-end">
                <button disabled={sending} type='submit' className='bg-primary px-4 py-2  border border-primary text-white rounded-md text-xl uppercase hover:bg-white hover:text-primary font-semibold'>
                    {sending ? "Saving" : "Save"}
                </button>
            </div>
        </form>
    </Modal>)
}