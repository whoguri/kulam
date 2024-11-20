"use client"
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Input from '../Input'
import axios from 'axios'
import { getError } from "../../../helper"
import { toast } from 'react-toastify'
import InputWithValue from '../InputWithValue'
import Modal from '../Modal'

export default function AddReferralUser({ onClose, onSave }) {
    const [sending, setSending] = useState(false)
    const { register, handleSubmit, setValue, watch, getValues, formState: { errors } } = useForm({ defaultValues: { role: "user" } })

    const onSubmit = async (data) => {
        try {
            setSending(true)
            data.userName = data.userName.trim()
            data.name = data.name.trim()
            data.password = data.password.trim()
            data.phone = data.phone.trim()
            data.role = "user"
            await axios.post("/api/auth/child", data)
            onSave()
            let copiedText = `Username: ${data.userName} | Password: ${data.password}`
            navigator.clipboard.writeText(copiedText)
            toast.success("Username  and password is copied")
            onClose()
            setSending(false)
        } catch (e) {
            setSending(false)
            toast.error(getError(e))
        }
    }

    return (<Modal
        title="Add"
        showHeder={false}
        width="md:w-2/3 w-[95%]"
        maxWidth="md:max-w-2xl"
        onClose={onClose} >
        <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className="w-full">
                <div className="grid grid-cols-1 gap-3">
                    <div>
                        <InputWithValue label="בחירת שם משתמש" isRequired={true}
                            value={watch("userName")}
                            onChange={(e) => {
                                const v = e.target.value.trim()
                                setValue("userName", v)
                            }} />
                        <Input type='hidden' formProps={{ ...register("userName", { required: true }) }}
                            isRequired={true} errors={errors} />
                    </div>
                    <Input label="בחירת סיסמא" formProps={{ ...register("password", { required: true }) }}
                        isRequired={true} errors={errors} />
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
                        <Input label='שם מלא' formProps={{ ...register("name", { required: true }) }}
                            isRequired={true} errors={errors} />
                        <Input label="מספר טלפון נייד" formProps={{ ...register("phone", { required: true }) }}
                            isRequired={true} errors={errors} />
                        <Input label='מיקום בארץ' formProps={{ ...register("city", { required: true }) }}
                            isRequired={true} errors={errors} />
                        <Input label='תעודת זהות' formProps={{ ...register("socialId", { required: false }) }}
                            isRequired={false} errors={errors} />
                    </div>
                </div>
            </div>
            <div className="!w-full flex flex-col justify-center gap-4  mt-5">
                <button type='submit' className="disabled:pointer-events-none disabled:opacity-80 border border-primary-dark  block px-4 2xl:py-[6px] xl:py-[6px] py-1 rounded-lg bg-gradient-to-r from-primary to-primary-dark hover:from-white hover:to-white hover:text-primary-dark 2xl:text-base text-sm"
                    disabled={sending}>הרשמה
                </button>
            </div>
        </form>
    </Modal>)
}
