"use client"
import { signIn, useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Input from '../Input'
import { useRouter } from 'next/navigation'
import Loading from '../Loading'
import axios from 'axios'
import { getError } from "../../../helper"
import { toast } from 'react-toastify'

export default function Register() {
    const [sending, setSending] = useState(false)
    const { status } = useSession()
    const { register, handleSubmit, formState: { errors } } = useForm({})
    const router = useRouter()

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/")
        }
    }, [status])

    const onSubmit = async (data) => {
        try {
            setSending(true)
            await axios.post("/api/auth/register", data)
            const result = await signIn('credentials', {
                redirect: false,
                userName: data.userName,
                password: "data.password",
            });
            setSending(false)
        } catch (e) {
            setSending(false)
            console.error("e>>")
            toast.error(getError(e))
        }
    }

    const googleLogin = async () => {
        try {
            setSending(true);
            const res = await signIn("google", { callbackUrl: "/" });
            if (res?.status === 200) {
                window.location.reload();
            }
        } catch (e) {
            console.error(e);
            toast.error(getError(e));
            setSending(false);
        }
    };

    if (status === "loading")
        return <Loading />
    return (<div className="xl:max-w-5xl max-w-[90%] mx-auto py-10" dir='rtl'>
        <div className="md:p-8 p-4 bg-white rounded-xl 2xl:min-h-[70vh] xl:min-h-[50vh] min-h-[60vh] md:w-[50%] w-full mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="]">
                <div className="w-full  px-5">
                    <div className="grid grid-cols-1 gap-y-3 mt-10">
                        <Input label="User Name" formProps={{ ...register("userName", { required: true }) }}
                            isRequired={true} errors={errors} />
                        <Input label="Name" formProps={{ ...register("name", { required: true }) }}
                            isRequired={true} errors={errors} />
                        <Input label="Phone" formProps={{ ...register("phone", { required: true }) }}
                            isRequired={true} errors={errors} />
                        <Input label="Password" formProps={{ ...register("password", { required: true }) }}
                            isRequired={true} errors={errors} />
                    </div>


                    {/* <Link href="/forgot-password" className="text-sm text-primary">Forgot password?</Link> */}
                </div>
                <div className="!w-full flex flex-col justify-center gap-4  px-5 mt-5">
                    <button className="border border-primary-dark  block px-4 2xl:py-[6px] xl:py-[6px] py-1 rounded-lg bg-gradient-to-r from-primary to-primary-dark hover:from-white hover:to-white hover:text-primary-dark 2xl:text-base text-sm"
                        disabled={sending}>Regsiter
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
                        onClick={() => googleLogin()} disabled={sending}>Continue with google</button>
                    <div className="laptop:text-base tablet:text-sm text-center">Already have an account? <a href="/login" className="font-semibold">Login</a></div>
                </div>
            </form>
        </div>
    </div>
    )
}
