"use client"
import { useForm } from "react-hook-form";
import Input from "./Input";
import Layout from "./Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { getError } from "helper";
import Loading from "../components/Loading"
import { ADMIN } from "@/constents/constArray";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Settings() {
    const { status, data } = useSession()
    const user = data?.user || {}
    const isAdmin = user?.role === ADMIN
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [sending, setSending] = useState(false)
    const { register, handleSubmit, setValue, watch, clearErrors, formState: { errors } } = useForm({})

    useEffect(() => {
        if (status === "authenticated" && isAdmin) {
            getList()
        } else if (status !== "loading") {
            router.push("/")
        }
    }, [status])

    const onSubmit = async (data) => {
        try {
            setSending(true)
            const res = await axios.put("/api/settings", data)
            if (res.status === 201) {
                toast.success("Updated Successfully")
                // onSave()
                setSending(false)
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

    const getList = async () => {
        try {
            const res = await axios.get("/api/settings")
            const data = res.data
            Object.keys(data || {}).forEach((e) => {
                if (e !== "id") {
                    setValue(e, data[e])
                }
            })
            setLoading(false)
        } catch (e) {
            console.error(e)
            toast.error(getError(e))
            // setLoading(false)
        }
    }

    return <Layout title="Settings">
        <div className="2xl:max-w-7xl xl:max-w-6xl max-w-[90%] mx-auto py-10">
            <div className="md:p-8 p-4 bg-white rounded-xl 2xl:min-h-[70vh] xl:min-h-[50vh] min-h-[60vh] md:w-[70%] w-full mx-auto">
                {loading ? <Loading /> :

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid md:grid-cols-3 grid-cols-1 gap-3">
                            <div></div>
                            <Input label="Monthly Subscription" type="number" step={0.01}
                                formProps={{ ...register("amountMonth", { required: true, valueAsNumber: true }) }} isRequired={true} errors={errors} clearErrors={clearErrors} />
                            <Input label="Yearly Subscription" type="number" step={0.01}
                                formProps={{ ...register("amountYear", { required: true, valueAsNumber: true }) }} isRequired={true} errors={errors} clearErrors={clearErrors} />

                            <Input label="generation 3" type="number"
                                formProps={{ ...register("gen_3", { required: true, valueAsNumber: true }) }} isRequired={true} errors={errors} clearErrors={clearErrors} />

                            <Input label="generation 2" type="number"
                                formProps={{ ...register("gen_2", { required: true, valueAsNumber: true }) }} isRequired={true} errors={errors} clearErrors={clearErrors} />

                            <Input label="generation 1" type="number"
                                formProps={{ ...register("gen_1", { required: true, valueAsNumber: true }) }} isRequired={true} errors={errors} clearErrors={clearErrors} />

                            <Input label="generation 3%" type="number" step={0.01}
                                formProps={{ ...register("gen_3_p", { required: true, valueAsNumber: true }) }} isRequired={true} errors={errors} clearErrors={clearErrors} />


                            <Input label="generation 2%" type="number" step={0.01}
                                formProps={{ ...register("gen_2_p", { required: true, valueAsNumber: true }) }} isRequired={true} errors={errors} clearErrors={clearErrors} />

                            <Input label="generation 1%" type="number" step={0.01}
                                formProps={{ ...register("gen_1_p", { required: true, valueAsNumber: true }) }} isRequired={true} errors={errors} clearErrors={clearErrors} />
                        </div>

                        <div className="flex justify-end items-end">
                            <button disabled={sending} type='submit' className='disabled:pointer-events-none disabled:opacity-60 bg-primary px-4 py-2  border border-primary text-white rounded-md text-xl uppercase hover:bg-white hover:text-primary font-semibold mt-5'>Save</button>
                        </div>
                    </form>
                }
            </div>
        </div>
    </Layout>
}