import Layout from "@/components/Layout";
import Image from "next/image";
export default function Contact() {
    return <Layout title="Contact">
        <div className="2xl:max-w-7xl xl:max-w-6xl max-w-[90%] mx-auto pt-10 pb-20">
            <div className="md:w-[70%] w-full mx-auto">
                <div className="grid md:grid-cols-2 grid-cols-1 md:p-8 p-4 md:gap-10 gap-7 bg-white rounded-xl">
                    <div>
                        <h2 className="subheading !font-normal text-center">Interested in our service?
                            Send us a message</h2>
                        <div>
                            <h3 className="paragraph pt-4 pb-2">Name<span className="text-red-600">*</span></h3>
                            <input placeholder="Enter your name" className="border border-gray-300 rounded-lg w-full py-1 px-3 focus:outline-none" />
                        </div>
                        <div>
                            <h3 className="paragraph pt-4 pb-2">Email address<span className="text-red-600">*</span></h3>
                            <input placeholder="Enter your name" className="border border-gray-300 rounded-lg w-full py-1 px-3 focus:outline-none" />
                        </div>
                        <div>
                            <h3 className="paragraph pt-4 pb-2">text<span className="text-red-600">*</span></h3>
                            <textarea rows={4} placeholder="Hint" className="border border-gray-300 rounded-lg w-full py-1 px-3 focus:outline-none" />
                        </div>
                        <div className="text-end mt-3">
                            <button className="bg-gradient-to-r from-primary to-primary-dark rounded-lg p-[1px]">
                                <span className="inline-block px-4 2xl:py-[6px] xl:py-[6px] py-1 rounded-lg bg-gradient-to-r from-primary to-primary-dark hover:from-white hover:to-white hover:text-primary-dark 2xl:text-base text-sm text-white">Submit</span>
                            </button>
                        </div>
                    </div>
                    <div className="bg-background px-5 py-6 rounded-[10px] flex flex-col justify-between md:gap-3 gap-6 relative z-10">
                        <div className="text-white">
                            <h2 className="2xl:text-3xl xl:text-2xl text-lg font-semibold">Contact Information</h2>
                            <h3 className="2xl:text-2xl xl:text-lg text-sm text-[#C9C9C9]">Say something to start a live chat!</h3>
                        </div>
                        <div className="flex flex-col md:gap-4 gap-3">
                            <div className="text-white flex gap-4 items-center">
                                <Image src="/Images/phone.svg" alt="phone" width={20} height={20} className="md:w-5 w-4 md:h-5 h-4" />
                                <div>
                                    <h3 className="md:text-base text-sm">+1012 3456 789</h3>
                                </div>
                            </div>
                            <div className="text-white flex gap-4 items-center">
                                <Image src="/Images/email.svg" alt="email" width={20} height={20} className="md:w-5 w-4 md:h-5 h-4" />
                                <div>
                                    <h3 className="md:text-base text-sm">demo@gmail.com</h3>
                                </div>
                            </div>
                            <div className="text-white flex gap-4 items-start">
                                <Image src="/Images/location.svg" alt="location" width={20} height={20} className="md:w-5 w-4 md:h-5 h-4" />
                                <div>
                                    <h3 className="md:text-base text-sm">132 Dartmouth Street Boston, Massachusetts 02156 United States</h3>
                                </div>
                            </div>
                        </div>
                        <div className="flex 2xl:gap-5 gap-3 items-center">
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
                        <Image src="/images/title2.svg" width={50} height={50} className="md:w-[100px] w-[60px] absolute bottom-5 right-4 z-0" />
                    </div>
                </div>
            </div>
        </div>
    </Layout>
}
