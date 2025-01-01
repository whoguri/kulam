import Modal from "./Modal"
import HtmlEditor from "./HtmlEditor"
import { toast } from "react-toastify"
import axios from "axios"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { getError } from "helper"
import Loading from "./Loading"

export default function WeeklyPostModal({ onSave, onClose }) {
    const [loading, setLoading] = useState(true)
    const [sending, setSending] = useState(false)
    const { register, handleSubmit, setValue, watch, clearErrors, formState: { errors } } = useForm({})

    useEffect(() => {
        getPost()
    }, [])

    const getPost = async () => {
        try {
            const res = await axios.get("/api/post")
            const data = res.data || {}
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
            const res = await axios.put("/api/post", data)
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

    return (<Modal title="Weekly" maxWidth="max-w-[800px]" onClose={onClose}>
        {loading ? <Loading style={{ background: "transparent", height: "400px" }} /> :
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-7">
                    <HtmlEditor isRequired={true} label="Description" value={watch("description")} setValue={setValue}
                        formProps={{ ...register("description", { required: true }) }} errors={errors} clearErrors={clearErrors} />
                </div>
                <div className="flex justify-end items-end">
                    <button disabled={sending} type='submit' className='bg-primary px-4 py-2  border border-primary text-white rounded-md text-xl uppercase hover:bg-white hover:text-primary font-semibold'>
                        {sending ? "Saving" : "Save"}
                    </button>
                </div>
            </form>}
    </Modal>)
}