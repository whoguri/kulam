
import { useEffect, useState } from "react"
import Input from "./Input"
import Loading from "./Loading"
import axios from "axios"
import { toast } from "react-toastify"
import Modal from "./Modal"
import { useForm } from "react-hook-form"
import SelectBox from "./SelectBox"

export default function UserModal({ onSave, onClose, id }) {
    const [loading, setLoading] = useState(true)
    const [sending, setSending] = useState(false)
    const { register, handleSubmit, setValue, watch, clearErrors, formState: { errors } } = useForm({})

    useEffect(() => {
        if (id)
            getUser()
        else
            setLoading(false)
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
            console.log(e)
            toast.error(getError(e))
            // setLoading(false)
        }
    }

    const onSubmit = async (data) => {
        try {
            setSending(true)
            const res = await axios.put("/api/users", + id, data)
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

        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
                <Input label="Name"
                    formProps={{ ...register("name", { required: true }) }} isRequired={true} errors={errors} />


                <SelectBox label="Status" clearErrors={clearErrors}
                    formProps={{ ...register("status", { required: true }) }} isRequired={true} errors={errors}>
                    <option>Active</option>
                    <option >Inactive</option>
                </SelectBox>

                <SelectBox label="Role" clearErrors={clearErrors}
                    formProps={{ ...register("role", { required: true }) }} isRequired={true} errors={errors}>
                    <option value="ADMIN">Admin</option>
                    <option value="ADVERTISER">Avertiser</option>
                    <option value="USER">User</option>
                </SelectBox>
            </div>

            <div className="flex justify-end items-end">
                <button disabled={sending} type='submit' className='bg-primary px-4 py-2  border border-primary text-white rounded-md text-xl uppercase hover:bg-white hover:text-primary font-semibold'>
                    {sending ? "Saving" : "Save"}
                </button>
            </div>
        </form>
    </Modal>)
}