import axios from "axios"
import { getError } from "helper"
import { useEffect, useState } from "react"
import Modal from "./Modal"
import HtmlEditor from "./HtmlEditor"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"

export default function ServiceModal({ onSave, onClose }) {
    const [loading, setLoading] = useState(false)
    const [sending, setSending] = useState(false)
    const { register, handleSubmit, setValue, watch, clearErrors, formState: { errors } } = useForm({})

    useEffect(() => {
        getService()
    }, [])

    const getService = async () => {
        try {
            const res = await axios.get("/api/services")
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
            const res = await axios.put("/api/services", data)
            if (res.status === 200) {
                toast.success("Updated Successfully")
                onSave()
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


    if (loading) {
        return <div className="text-primary text-4xl font-medium h-[calc(100vh-72px)] flex items-center justify-center">Loading....</div>
    }

    return (<Modal title="Service" maxWidth="max-w-[800px]" onClose={onClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="my-7">
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