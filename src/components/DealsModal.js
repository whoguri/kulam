import axios from "axios"
import { getError } from "helper"
import { useEffect, useState } from "react"
import Modal from "./Modal"
import HtmlEditor from "./HtmlEditor"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import Input from "../components/Input"
import { ADMIN } from "@/constents/constArray"
import SelectBox from "./SelectBox"
import Loading from "./Loading"
import { useSession } from "next-auth/react"

export default function DealsModal({ onSave, onClose, id }) {
    const { data } = useSession()
    const user = data?.user || {}
    const isAdmin = user?.role === ADMIN
    const [advertisers, setAdvertisers] = useState([])

    const [loading, setLoading] = useState(true)
    const [sending, setSending] = useState(false)
    const { register, handleSubmit, setValue, watch, clearErrors, formState: { errors } } = useForm({})

    useEffect(() => {
        getAdvertisers()
        if (id)
            getDeals()
        else
            setLoading(false)
    }, [id])

    const getDeals = async () => {
        try {
            const res = await axios.get("/api/deals/" + id)
            const data = res.data
            Object.keys(data || {}).forEach((e) => {
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
            if (isAdmin) {
                let advertiserId = data.advertiserId
                delete data.advertiserId
                data.advertiser = { connect: { id: advertiserId } }
            } else {
                data.advertiser = { connect: { id: user?.id } }
            }
            let res = null;
            if (id) {
                res = await axios.put("/api/deals/" + id, data)
            } else {
                res = await axios.post("/api/deals", data)
            }
            if (res.status === 200) {
                toast.success("Updated Successfully")
                onSave()
                onClose()
                setSending(false)
            }
        } catch (error) {
            setSending(false)
            toast.error(getError(error))
        }
    }

    const getAdvertisers = async () => {
        try {
            const res = await axios.get("/api/users?role=advertiser")
            const data = res.data
            setAdvertisers(data)
        } catch (e) {
            console.log(e)
            toast.error(getError(e))
        }
    }

    return (<Modal title="Deal" maxWidth="max-w-[800px]" onClose={onClose}>
        {loading ? <Loading style={{ background: "transparent", height: "400px" }} /> :
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
                    {isAdmin && <SelectBox label="Advertiser" clearErrors={clearErrors}
                        formProps={{ ...register("advertiserId", { required: true }) }} isRequired={true} errors={errors}>
                        {advertisers.map((e, i) => {
                            return <option value={e.id} key={e.id}>{e.name}</option>
                        })}
                    </SelectBox>}
                    <Input label="Name"
                        formProps={{ ...register("name", { required: true }) }} isRequired={true} errors={errors} />

                    <Input label="Amount" formProps={{ ...register("amount", { required: true, valueAsNumber: true }) }}
                        isRequired={true} errors={errors} type="number" />
                </div>
                <div className="my-6">
                    <HtmlEditor isRequired={true} label="Description" value={watch("description")} setValue={setValue}
                        formProps={{ ...register("description", { required: true }) }} errors={errors} clearErrors={clearErrors} />
                </div>
                <div className="flex justify-end items-end">
                    <button disabled={sending} type='submit' className='bg-primary px-4 py-2  border border-primary text-white rounded-md text-xl uppercase hover:bg-white hover:text-primary font-semibold'>
                        {sending ? "Saving" : "Save"}
                    </button>
                </div>
            </form>}
    </Modal>)
}