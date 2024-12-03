"use client"
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import Modal from '../Modal'
import axios from 'axios'
import { endOfDay, endOfMonth } from 'date-fns'
import { toast } from 'react-toastify'
import { getError } from 'helper'

function GetSubscriptionModal() {
    const { data, status } = useSession()
    const subscriptions = data?.user?.subscriptions || []
    const [open, setOpen] = useState(false)
    const [sending, setSending] = useState(false)

    useEffect(() => {
        if (status === "authenticated" && subscriptions.length === 0) {
            setOpen(true)
        }
    }, [status])

    if (!open) {
        return null
    }

    const onSubscribe = async () => {
        try {
            setSending(true)
            let res = await axios.post(`api/auth/subscription`, { date: new Date(), expiry: (endOfDay(endOfMonth(new Date()))) })
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
    return (<Modal title="Subscription" closeButton={false} >
        <div>

        </div>
        <button type='button' disabled={sending} onClick={() => { onSubscribe() }}
            className='bg-primary px-4 py-1 border border-primary text-white rounded-md text-base uppercase hover:bg-white hover:text-primary font-semibold'>Save</button>
    </Modal>
    )
}

export default GetSubscriptionModal
