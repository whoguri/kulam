"use client"
import axios from "axios";
import { getError } from "helper";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Contact() {
    const [message, setMessage] = useState("")
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [sending, setSending] = useState(false)
    const validEmailRgx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    const onSubmit = async () => {
        try {
            setError("")
            if (!name) {
                setError("Name is required");
                return;
            } else if (name.length < 4) {
                setError("Name is short");
                return;
            }

            if (!email) {
                setError("Enter email")
                return
            } if (email && !validEmailRgx.test(email)) {
                setError("Invalid email")
                return;
            }

            if (!message) {
                setError("Message is required");
                return;
            } else if (message.length < 4) {
                setError("Message is short");
                return;
            }
            setSuccess("")
            setSending(true)
            const data = { email, name, message }

            let res = await axios.post("/api/contact", data)
            if (res.status === 200) {
                toast.success("Submitted Successfully")
                setTimeout(() => {
                    setSuccess("")
                    setSending(false)
                    setName("")
                    setEmail("")
                    setMessage("")
                }, 5000);
            } else {
                setSending(false)
                setError("Someting went wrong")
            }
        } catch (error) {
            console.log(error)
            setSending(false)
            toast.error(getError(error))
        }
    }

    return <div>
        <div className="2xl:max-w-7xl xl:max-w-6xl max-w-[90%] mx-auto pt-10 pb-20">
            <div className="md:w-[70%] w-full mx-auto">
                <div className="grid md:grid-cols-2 grid-cols-1 md:p-8 p-4 md:gap-10 gap-7 bg-white rounded-xl">
                    <div>
                        <h2 className="subheading !font-normal text-center">Interested in our service?
                            Send us a message</h2>
                        <div>
                            <h3 className="paragraph pt-4 pb-2 text-end">Name<span className="text-red-600">*</span></h3>
                            <input placeholder="Enter your name" type="text" className="border border-gray-300 rounded-lg w-full py-1 px-3 focus:outline-none text-end"
                                value={name}
                                onChange={(e) => {
                                    setError("")
                                    setName(e.target.value)
                                }} />
                            {(error === "Name is required" || error === "Name is too short") && <div className="text-red-400 text-xs text-end">{error}</div>}
                        </div>
                        <div>
                            <h3 className="paragraph pt-4 pb-2 text-end">Email address<span className="text-red-600">*</span></h3>
                            <input placeholder="Enter your name" className="border border-gray-300 rounded-lg w-full py-1 px-3 focus:outline-none text-end" type="email"
                                value={email}
                                onChange={(e) => {
                                    setError("")
                                    setEmail(e.target.value)
                                }} />
                            {(error === "Enter email" || error === "Invalid email") && <div className="text-red-400 text-xs text-end">{error}</div>}
                        </div>
                        <div>
                            <h3 className="paragraph pt-4 pb-2 text-end">Message<span className="text-red-600">*</span></h3>
                            <textarea rows={4} placeholder="Hint" className="border border-gray-300 rounded-lg w-full py-1 px-3 focus:outline-none text-end"
                                value={message}
                                onChange={(e) => {
                                    setError("")
                                    setMessage(e.target.value)
                                }} />
                            {(error === "Message is required" || error === "Message is short") && <div className="text-red-400 text-xs text-end">{error}</div>}
                        </div>
                        <div className="text-end mt-3">
                            <button type="button" disabled={sending} className="bg-gradient-to-r from-primary to-primary-dark rounded-lg p-[1px]"
                                onClick={() => {
                                    onSubmit()
                                }}>
                                <span className="inline-block px-4 2xl:py-[6px] xl:py-[6px] py-1 rounded-lg bg-gradient-to-r from-primary to-primary-dark hover:from-white hover:to-white hover:text-primary-dark 2xl:text-base text-sm text-white">Submit</span>
                            </button>
                        </div>
                    </div>
                    <div className="bg-background px-5 md:py-6 py-10 rounded-[10px] flex flex-col justify-between md:gap-3 gap-6 relative z-10">
                        <div className="text-white">
                            <h2 className="2xl:text-3xl xl:text-2xl text-lg font-semibold text-end">Contact Information</h2>
                            <h3 className="2xl:text-2xl xl:text-lg text-sm text-[#C9C9C9] text-end">Say something to start a live chat!</h3>
                        </div>
                        <div className="flex items-end flex-col md:gap-4 gap-3">
                            <div className="text-white flex md:gap-4 gap-1 items-center">
                                <div>
                                    <h3 className="md:text-base text-sm text-end">+1012 3456 789</h3>
                                </div>
                                <Image src="/Images/phone.svg" alt="phone" width={20} height={20} className="md:w-5 w-4 md:h-5 h-4" />
                            </div>

                            <div className="text-white flex md:gap-4 gap-1 items-center">
                                <div>
                                    <h3 className="md:text-base text-sm text-end">demo@gmail.com</h3>
                                </div>
                                <Image src="/Images/email.svg" alt="email" width={20} height={20} className="md:w-5 w-4 md:h-5 h-4" />
                            </div>
                            <div className="text-white flex md:gap-4 gap-1 items-start">
                                <div>
                                    <h3 className="md:text-base text-sm text-end">132 Dartmouth Street Boston, Massachusetts 02156 United States</h3>
                                </div>
                                <Image src="/Images/location.svg" alt="location" width={20} height={20} className="md:w-5 w-4 md:h-5 h-4" />
                            </div>
                        </div>

                        <div>
                            <Image src="/images/title2.svg" width={50} height={50} className="md:w-[100px] w-[60px] absolute bottom-5 left-4 z-0" />

                            <div className="flex 2xl:gap-5 gap-3 items-center justify-end">
                                <a href="https://www.instagram.com/" target="_blank">
                                    <Image src="/images/insta.svg" alt="insta" width={30} height={30} className="2xl:w-[30px] w-[18px] 2xl:h-[30px] h-[18px]" />
                                </a>
                                <a href="https://www.facebook.com/" target="_blank">
                                    <Image src="/images/fb.svg" alt="fb" width={15} height={15} className="2xl:w-[25px] w-[16px] 2xl:h-[25px] h-[16px]" />
                                </a>
                                <a href="https://www.twitter.com/" target="_blank">
                                    <Image src="/images/x.svg" alt="x" width={25} height={25} className="2xl:w-[25px] w-[16px] 2xl:h-[25px] h-[16px]" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}