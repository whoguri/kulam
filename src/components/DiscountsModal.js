import axios from "axios"
import { getError } from "helper"
import { useEffect, useState } from "react"
import Modal from "./Modal"
import HtmlEditor from "./HtmlEditor"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import Input from "./Input"
import Loading from "./Loading"
import Image from "next/image"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from "@/constents/firebase"
import { ADMIN } from "@/constents/constArray"
import { useSession } from "next-auth/react"
import SelectBox from "./SelectBox"

export default function DiscountsModal({ onSave, onClose, id }) {
    const { data } = useSession()
    const user = data?.user || {}
    const isAdmin = user?.role === ADMIN
    const [advertisers, setAdvertisers] = useState([])

    const [loading, setLoading] = useState(true)
    const [sending, setSending] = useState(false)
    const [image, setImage] = useState(null)

    const { register, handleSubmit, setValue, watch, clearErrors, formState: { errors } } = useForm({})

    useEffect(() => {
        getAdvertisers()
        if (id)
            getDiscount()
        else
            setLoading(false)
    }, [id])

    const getDiscount = async () => {
        try {
            const res = await axios.get("/api/discounts/" + id)
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

    const onSubmit = async (data) => {
        try {
            setSending(true)

            if (!image && !watch("image")) {
                toast.error("Select Image")
                return
            }
            if (image) {
                const array = image.name.split(".")
                const ext = array[array.length - 1]
                const storageRef = ref(storage, `discounts/image/${new Date().getTime()}.${ext}`)
                const snap = await uploadBytes(storageRef, image)
                const d = await getDownloadURL(storageRef)
                data.image = d
            }
            if (isAdmin) {
                let advertiserId = data.advertiserId
                delete data.advertiserId
                data.advertiser = { connect: { id: advertiserId } }
            } else {
                data.advertiser = { connect: { id: user?.id } }
            }

            let res = null;
            if (id) {
                res = await axios.put("/api/discounts/" + id, data)
            } else {
                res = await axios.post("/api/discounts", data)
            }
            if (res.status === 200) {
                toast.success("Updated Successfully")
                onSave()
                onClose()
                setSending(false)
            }
        } catch (error) {
            console.log(error)
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
            console.error(e)
            toast.error(getError(e))
        }
    }


    return (<Modal title="Discount" maxWidth="max-w-[800px]" onClose={onClose}>
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
                <div>
                    <label className="text-sm font-bold mb-1 block capitalize">Image</label>
                    <div className="grid grid-cols-2 items-start gap-4">
                        <label htmlFor="image" className="border-2 bg-white cursor-pointer hover:bg-light flex items-center justify-center h-24 border-dashed border-slate-300 p-1 rounded-lg">
                            <img src="/images/plus.svg" alt="add" height={20} width={20} className="text-2xl" />
                            <input type="file" className="hidden" id="image" accept=".jpg, .jpeg, .png, .gif"
                                onChange={(e) => {
                                    setImage(e.target.files[0]);
                                }} />
                        </label>
                        {(image || watch("image")) && <div className="border-2 overflow-hidden h-24 flex border-dashed border-slate-300 rounded-lg">
                            {image ? <Image placeholder="empty" height={100} width={200} alt={watch("name")}
                                src={URL.createObjectURL(image)} className="w-full h-auto object-contain" /> : (
                                !watch("image") ? null :
                                    <Image placeholder="empty" height={100} width={200} alt={watch("name")}
                                        src={watch("image") || ""} className="w-full h-auto object-contain" />)}
                        </div>}
                    </div>
                </div>

                <div className="my-6">
                    <HtmlEditor isRequired={true} label="Description" value={watch("description")} setValue={setValue}
                        formProps={{ ...register("description", { required: true }) }} errors={errors} clearErrors={clearErrors} />
                </div>
                <div className="flex justify-end items-end">
                    <button disabled={sending} type='submit' className='bg-primary px-4 py-2 border border-primary text-white rounded-md text-xl uppercase hover:bg-white hover:text-primary font-semibold'>
                        {sending ? "Saving" : "Save"}
                    </button>
                </div>
            </form>}
    </Modal>)
}