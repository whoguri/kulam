import { useState } from "react"
import Input from "../Input"
import axios from "axios"
import { toast } from "react-toastify"
import Modal from "../Modal"
import { useForm } from "react-hook-form"
import { getError } from "helper"

export default function ChangePassword({ onSave, onClose, id }) {
    const [sending, setSending] = useState(false)
    const { register, handleSubmit, setValue, watch, clearErrors, formState: { errors } } = useForm({})
    const [type, setType] = useState("password")
    const [c_type, setC_Type] = useState("password")

    const onSubmit = async (data) => {
        try {
            setSending(true)
            const res = await axios.put("/api/auth/password", data)
            if (res.status === 200) {
                toast.success("Changed Successfully")
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

    return (<Modal title="User" maxWidth="max-w-[500px]" onClose={onClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid  grid-cols-1 gap-3">
                <Input label="Old Password"
                    formProps={{ ...register("oldPassword", { required: true }) }} isRequired={true} errors={errors} clearErrors={clearErrors} />

                <Input label="New Password" type={type} icon={type === "password" ? "/eye-open.svg" : "/eye-close.svg"}
                    onClickIcon={() => {
                        if (type === "password") {
                            setType("text")
                        } else {
                            setType("password")
                        }
                    }}
                    formProps={{ ...register("newPassword", { required: true, minLength: { value: 4, message: "Password must be more than or equal to 4 characters " } }) }} isRequired={true} errors={errors} clearErrors={clearErrors} />

                <Input label="Confirm new password" type={c_type} icon={c_type === "password" ? "/eye-open.svg" : "/eye-close.svg"}
                    onClickIcon={() => {
                        if (c_type === "password") {
                            setC_Type("text")
                        } else {
                            setC_Type("password")
                        }
                    }}
                    formProps={{
                        ...register("cNewPassword", {
                            required: true, validate: value =>
                                value === watch("newPassword") || 'Password is not matching with new password'
                        })
                    }} isRequired={true} errors={errors} clearErrors={clearErrors} />

            </div>

            <div className="flex justify-end items-end mt-4">
                <button disabled={sending} type='submit' className='bg-primary px-4 py-2  border border-primary text-white rounded-md text-xl uppercase hover:bg-white hover:text-primary font-semibold'>
                    {sending ? "Saving" : "Save"}
                </button>
            </div>
        </form>
    </Modal>)
}