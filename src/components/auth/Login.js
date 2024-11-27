"use client"
import { signIn } from 'next-auth/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Input from '../Input'
import { getError } from 'helper'
import { toast } from 'react-toastify'
import { BASE_URL } from '@/constents/constArray'

export default function Login({ setSending, sending }) {
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
                <Input label="שם משתמש" formProps={{ ...register("userName", { required: true }) }}
                    isRequired={true} errors={errors} />
                <Input label="סיסמא" formProps={{ ...register("password", { required: true }) }}
                    isRequired={true} errors={errors} />
            </div>

            {/* <Link href="/forgot-password" className="text-sm text-primary">Forgot password?</Link> */}
        </div>
        <div className="!w-full flex flex-col justify-center gap-4 mt-5">
            <button className="disabled:pointer-events-none disabled:opacity-80 border border-primary-dark  block px-4 2xl:py-[6px] xl:py-[6px] py-1 rounded-lg bg-gradient-to-r from-primary to-primary-dark hover:from-white hover:to-white hover:text-primary-dark 2xl:text-base text-sm"
                disabled={sending}>

                {sending ? <span className='flex items-center justify-center'> <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <g fill="currentColor">
                        <path fill-rule="evenodd" d="M12 19a7 7 0 1 0 0-14a7 7 0 0 0 0 14m0 3c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10" clip-rule="evenodd" opacity="0.2" />
                        <path d="M2 12C2 6.477 6.477 2 12 2v3a7 7 0 0 0-7 7z" />
                    </g>
                </svg></span> : "כניסה לחשבון"}
            </button>
        </div>
    </form>
    )
}