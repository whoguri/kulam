"use client"
import { signIn, useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Input from '../Input'
import { BASE_URL } from '@/constents/constArray'
import { useRouter } from 'next/navigation'
import Loading from '../Loading'
import { getError } from 'helper'

export default function Login() {
    const [sending, setSending] = useState(false)
    const { status } = useSession()
    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm({})

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/")
        }
    }, [status])

    const onSubmit = async (data) => {
        try {
            setSending(true)
            const result = await signIn('credentials', {
                redirect: false,
                email: data.email,
                password: data.password,
            });
            setSending(false)
        } catch (e) {
            setSending(false)
            console.error(e)
            toast.error(getError(e))
        }
    }

    if (status === "loading")
        return <Loading />
    return (<div className="xl:max-w-5xl max-w-[90%] mx-auto py-10" dir='rtl'>
        <div className="md:p-8 p-4 bg-white rounded-xl 2xl:min-h-[70vh] xl:min-h-[50vh] min-h-[60vh] md:w-[50%] w-full mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="]">
                <div className="w-full  px-5">
                    <div className="grid grid-cols-1 gap-y-3 mt-10">
                        <Input label="Phone" formProps={{ ...register("phone", { required: true }) }}
                            isRequired={true} errors={errors} />
                        <Input label="Password" formProps={{ ...register("password", { required: true }) }}
                            isRequired={true} errors={errors} />
                    </div>


                    {/* <Link href="/forgot-password" className="text-sm text-primary">Forgot password?</Link> */}
                </div>
                <div className="!w-full flex flex-col justify-center gap-4  px-5 mt-5">
                    <button className="border border-primary-dark  block px-4 2xl:py-[6px] xl:py-[6px] py-1 rounded-lg bg-gradient-to-r from-primary to-primary-dark hover:from-white hover:to-white hover:text-primary-dark 2xl:text-base text-sm"
                        disabled={sending}>Login with phone
                    </button>

                    <div className="relative my-2 text-center border-t">
                        <span className="absolute top-1/2 -translate-y-1/2 left-0 right-0">
                            <div className="text-base">
                                <span className="inline-block px-6 bg-white">or</span>
                            </div>
                        </span>
                    </div>

                    <button type="button"
                        className="border border-primary-dark block px-4 2xl:py-[6px] xl:py-[6px] py-1 rounded-lg bg-gradient-to-r from-primary to-primary-dark hover:from-white hover:to-white hover:text-primary-dark 2xl:text-base text-sm"
                        onClick={async () => {
                            await signIn('google', {
                                redirect: false,
                                callbackUrl: BASE_URL + "/"
                            })
                        }} disabled={sending}>Continue with google</button>
                    <div className="laptop:text-base tablet:text-sm text-center">Dont't have any account? <a href="/register" className="font-semibold">Register</a></div>
                </div>
            </form>
        </div>
    </div>
    )
}