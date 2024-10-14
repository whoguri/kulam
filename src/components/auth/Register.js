"use client"
import { signIn, } from 'next-auth/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Input from '../Input'
import axios from 'axios'
import { getError } from "../../../helper"
import { toast } from 'react-toastify'
import { BASE_URL, ROLES } from '@/constents/constArray'
import InputWithValue from '../InputWithValue'

export default function Register() {
    const [sending, setSending] = useState(false)
    const { register, handleSubmit, setValue, watch, getValues, formState: { errors } } = useForm({ defaultValues: { role: "user" } })
    const code = localStorage.getItem("referredBy")

    const onSubmit = async (data) => {
        try {
            setSending(true)
            if (code) {
                data.referredBy = code
            }
            data.userName = data.userName.trim()
            data.name = data.name.trim()
            data.password = data.password.trim()
            data.phone = data.phone.trim()
            await axios.post("/api/auth/register", data)
            const result = await signIn('credentials', {
                redirect: false,
                userName: data.userName,
                password: data.password,
            });
            if (result.error) {
                toast.error(result.error)
            } else {
                window.location.reload()
                localStorage.removeItem("referredBy")
                window.location.href = BASE_URL
            }
            setSending(false)
        } catch (e) {
            setSending(false)
            console.error("e>>")
            toast.error(getError(e))
        }
    }

    return (<form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="w-full">
            {!code && <div>
                <label className="text-sm font-bold pb-1"> הרשם כמשתמש רגיל או כמפרסם נא לבחור סוג משתמש<span className="text-red-500">*</span></label>
                <div className='flex md:gap-8 mb-4 md:flow-row flex-col'>
                    {ROLES.map((e, i) => {
                        if (e.value === "admin") {
                            return null
                        }
                        return (
                            <label
                                htmlFor={e.value}
                                className="flex items-center gap-2 md:text-lg text-sm"
                            >
                                <input
                                    value={e.value}
                                    checked={watch("role") === e.value}
                                    name="role"
                                    id={e.value}
                                    type="radio"
                                    onChange={(e) => {
                                        setValue("role", e.target.value);
                                    }}
                                    key={e.value}
                                    className={`mt-1 md:w-4 md:h-4 w-3 h-3`}
                                />
                                <span className="capitalize inline-flex leading-none">
                                    אנירוצה להרשם כ
                                    {e.label}
                                </span>
                            </label>
                        );
                    })}
                </div>
            </div>}
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

            {/* <Link href="/forgot-password" className="text-sm text-primary">Forgot password?</Link> */}
        </div>
        <div className="!w-full flex flex-col justify-center gap-4  mt-5">
            <button type='submit' className="disabled:pointer-events-none disabled:opacity-80 border border-primary-dark  block px-4 2xl:py-[6px] xl:py-[6px] py-1 rounded-lg bg-gradient-to-r from-primary to-primary-dark hover:from-white hover:to-white hover:text-primary-dark 2xl:text-base text-sm"
                disabled={sending}>הרשמה
            </button>
        </div>
    </form>
    )
}
