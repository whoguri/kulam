import { useEffect, useState } from "react"
import Input from "../Input"
import Loading from "../Loading"
import axios from "axios"
import { toast } from "react-toastify"
import Modal from "../Modal"
import { useForm } from "react-hook-form"
import MultiInput from "../MultiInput"
import { getError } from "helper"

export default function AddPollModal({ onSave, onClose, id }) {
    const [loading, setLoading] = useState(true)
    const [sending, setSending] = useState(false)
    const { register, handleSubmit, setValue, watch, clearErrors, formState: { errors } } = useForm({})
    const [options, setOptions] = useState([""])

    useEffect(() => {
        if (id) {
            getData()
        } else {
            setLoading(false)
        }
    }, [id])

    const getData = async () => {
        try {
            const res = await axios.get("/api/polls/" + id)
            const data = res.data
            Object.keys(data).forEach((e) => {
                if (e !== "id") {
                    setValue(e, data[e])
                }
            })
            const tc = data.options || []
            setOptions(ar => [...tc])
            setLoading(false)
        } catch (e) {
            console.error(e)
            toast.error(getError(e))
        }
    }

    const onSubmit = async (data) => {
        try {
            setSending(true)
            data.options = options.map(e => e.trim()).filter(e => e)
            let res;
            if (id) {
                res = await axios.put("/api/polls/" + id, data)
            } else {
                res = await axios.post("/api/polls", data)
            }
            if (res.status === 200) {
                toast.success("Saved Successfully")
                onSave()
                onClose()
            } else {
                toast.error("Something went wrong")
                setSending(false)
            }
        } catch (error) {
            setSending(false)
            toast.error(getError(error))
        }
    }

    return (<Modal title={(id ? "Edit" : "Add") + " Poll"} maxWidth="max-w-[800px]" onClose={onClose}>
        {loading ? <Loading /> :
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 gap-3">
                    <Input label="Name"
                        formProps={{ ...register("question", { required: true }) }} isRequired={true} errors={errors} clearErrors={clearErrors} />
                    <MultiInput items={options} setItems={setOptions} buttonName='options' label="Options" />
                </div>

                <div className="flex justify-end items-end mt-2">
                    <button disabled={sending} type='submit' className='bg-primary px-4 py-2  border border-primary text-white rounded-md text-xl uppercase hover:bg-white hover:text-primary font-semibold'>
                        {sending ? "Saving" : "Save"}
                    </button>
                </div>
            </form>}
    </Modal>)
}