"use client"
import { signIn } from 'next-auth/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Input from '../Input'
import { getError } from 'helper'
import { toast } from 'react-toastify'
import { BASE_URL } from '@/constents/constArray'

export default function Login() {
    const [sending, setSending] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm({})

    const onSubmit = async (data) => {
        try {
            setSending(true)
            const result = await signIn('credentials', {
                redirect: false,
                userName: data.userName,
                password: data.password,
            });
            if (result.error) {
                toast.error(result.error)
            } else {
                window.location.href = BASE_URL
            }
            setSending(false)
        } catch (e) {
            setSending(false)
            console.error(e)
            toast.error(getError(e))
        }
    }

    return (<form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="w-full">
            <div className="grid grid-cols-1 gap-y-3">
                <Input label="User Name" formProps={{ ...register("userName", { required: true }) }}
                    isRequired={true} errors={errors} />
                <Input label="Password" formProps={{ ...register("password", { required: true }) }}
                    isRequired={true} errors={errors} />
            </div>

            {/* <Link href="/forgot-password" className="text-sm text-primary">Forgot password?</Link> */}
        </div>
        <div className="!w-full flex flex-col justify-center gap-4 mt-5">
            <button className="border border-primary-dark  block px-4 2xl:py-[6px] xl:py-[6px] py-1 rounded-lg bg-gradient-to-r from-primary to-primary-dark hover:from-white hover:to-white hover:text-primary-dark 2xl:text-base text-sm"
                disabled={sending}>Login
            </button>
        </div>
    </form>
    )
}