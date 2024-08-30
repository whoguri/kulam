import Modal from "../components/Modal"
import HtmlEditor from "../components/HtmlEditor"
import Input from "../components/Input"
import { toast } from "react-toastify"
import axios from "axios"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { getError } from "helper"

export default function HiringModal() {
    const [loading, setLoading] = useState(false)
    const [hiring, setHiring] = ("")
    const [sending, setSending] = useState(false)
    const { register, handleSubmit, setValue, watch, clearErrors, formState: { errors } } = useForm({

    })

    useEffect(() => {
        getHiring()
    }, [])

    const getHiring = async () => {
        try {
            console.log(">>>")
            const res = await axios.get("/api/hiring/")
            const data = res.data
            Object.keys(data).forEach((e) => {
                if (e !== "id") {
                    setValue(e, data[e])
                }
            })
            setHiring(data)
            setLoading(false)
        } catch (e) {
            console.log(e)
            toast.error(getError(e))

            // setLoading(false)
        }
    }

    const onSubmit = async (data) => {
        try {
            console.log(data)
            setSending(true)
            const res = await axios.put("/api/hiring", data)
            if (res.status === 200) {
                toast.success("Updated Successfully")
                setSending(false)
            } else {
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

    return (<Modal title="Edit User" width="w-[50%]" >
        <form onSubmit={handleSubmit(onSubmit)}>

            {/* <div className="grid grid-cols-1 gap-4">
                <Input label="Name"
                    formProps={{ ...register("name", { required: true }) }} isRequired={true} errors={errors} />
            </div> */}

            <div className="mb-10">
                <Input label="Name"
                    formProps={{ ...register("description", { required: true }) }} isRequired={true} errors={errors} />

                {/* <HtmlEditor isRequired={true} label="Description" value={watch("description")} setValue={setValue}
                    formProps={{ ...register("description", { required: true }) }} errors={errors} clearErrors={clearErrors} /> */}
            </div>
            <div className="flex justify-end items-end">
                <button disabled={sending} type='submit' className='bg-primary px-4 py-2  border border-primary text-white rounded-md text-xl uppercase hover:bg-white hover:text-primary font-semibold '>
                    {sending ? "Saving" : "Save"}
                </button>
            </div>
        </form>
    </Modal>)
}