"use client"
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import Modal from '../Modal'
import axios from 'axios'
import { addMonths, addYears, endOfDay, endOfMonth, subDays } from 'date-fns'
import { toast } from 'react-toastify'
import { getError } from 'helper'
import { currency } from '@/constents/constArray'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'

function GetSubscriptionModal({ onClose }) {
    const [sending, setSending] = useState(false)
    const [prices, setPrices] = useState(null)
    const [loading, setLoading] = useState(true)
    const [type, setSelPrice] = useState('')

    useEffect(() => {
        getPrices()
    }, [])

    const onSubscribe = async () => {
        try {
            if (!type) {
                toast.error("Select a plan")
                return
            }
            setSending(true)
            let expiry = null
            let amount = null
            if (type === "MONTHLY") {
                expiry = endOfDay(addMonths(new Date(), 1))
                amount = prices.amountMonth
            } else {
                expiry = endOfDay(addYears(new Date(), 1))
                amount = prices.amountYear
            }
            expiry = subDays(expiry, 1)

            let res = await axios.post(`api/auth/subscription`, {
                amount, date: new Date(),
                expiry,
                type: type
            })
            if (res.status === 201) {
                toast.success("Subscribed Successfully")
                window.location.reload()
            }
        } catch (error) {
            setSending(false)
            console.log(error)
            toast.error(getError(error))
        }
    }

    const getPrices = async () => {
        try {
            let res = await axios.get("/api/settings")
            setPrices(res.data)
            setLoading(false)
        } catch (error) {
            toast.error(getError(error))
        }
    }
    const initialOptions = {
        clientId: "Abd-8Fo6S2lA0w4qoKuceeUemYAZKjGNkGZ4P6F_fH9rXuqW7bHz9z59ahJkpQULzXhplGYPrWqavm7I",
        vault: true,
        intent: "subscription",
        // currency: "USD"
    };
    const styles = {
        shape: "rect",
        layout: "vertical",
    };
    const createSubscription = (data, actions) => {
        console.log("createSubscription", data)
        return actions.subscription.create({
            "plan_id": "P-9X755875SJ295634JM5MBNCQ"
        });
    }

    const onApprove = (data) => {
        console.log("appp", data)
        alert(`You have successfully subscribed to ${data.subscriptionID}`); // Optional message given to subscriber
    }
    const onError = (err) => {
        console.log("errr", err)
        alert(`error ${err}`); // Optional message given to subscriber
    }
    const onCancel = (cc) => {
        console.log("calce", cc)
        alert(`onCancel ${cc}`); // Optional message given to subscriber
    }

    return (<Modal title="Subscription" onClose={onClose} >
        {loading ? <div>
            <span className='flex items-center justify-center my-10'>
                <svg className="animate-spin text-primary h-20 w-20" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <g fill="currentColor">
                        <path fill-rule="evenodd" d="M12 19a7 7 0 1 0 0-14a7 7 0 0 0 0 14m0 3c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10" clip-rule="evenodd" opacity="0.2" />
                        <path d="M2 12C2 6.477 6.477 2 12 2v3a7 7 0 0 0-7 7z" />
                    </g>
                </svg></span>
        </div> : <>
            <div className='grid grid-cols-2 gap-4 mb-6 mt-4'>
                <button
                    onClick={() => { setSelPrice("MONTHLY") }}
                    className={`${type === "MONTHLY" ? "gradient-bg text-white " : ""} px-4 py-6 border rounded-lg border-primary hover:bg-slate-100`}>
                    <div>Monthly</div>
                    <div className='text-2xl font-medium'>{currency}{prices.amountMonth}</div>
                </button>
                <button
                    onClick={() => { setSelPrice("YEARLY") }}
                    className={`${type === "YEARLY" ? "gradient-bg text-white" : ""} px-4 py-6 border rounded-lg border-primary hover:bg-slate-100`}>
                    <div>Yearly</div>
                    <div className='text-2xl font-medium'>{currency}{prices.amountYear}</div>
                </button>
            </div>
            {!type ? "Select Plan" : <PayPalScriptProvider
                options={initialOptions}>
                <PayPalButtons style={styles}
                    createSubscription={createSubscription}
                    onApprove={onApprove}
                    onError={onError}
                    onCancel={onCancel}
                />
            </PayPalScriptProvider>}
            {/* <button type='button' disabled={sending} onClick={() => { onSubscribe() }}
                className='bg-primary mb-4 px-4 py-1 border border-primary text-white rounded-md text-base uppercase hover:bg-white hover:text-primary font-semibold'>Save</button> */}
        </>}
    </Modal>
    )
}

export default GetSubscriptionModal
