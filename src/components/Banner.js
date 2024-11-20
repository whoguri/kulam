"use client"
import Image from "next/image"

export default function Banner({ title = "", buttonType = "button", onClickButton, buttonTitle = "" }) {
    return <div className="bg-background relative overflow-hidden">
        <div className="2xl:max-w-7xl xl:max-w-6xl max-w-[90%] mx-auto md:pt-6 pt-4 relative z-20">
            <div className="flex items-center justify-end md:gap-8 gap-4 md:pb-10 pb-7">
                {buttonTitle && <button type={buttonType} className="inline-flex justify-center items-center md:mt-4 mt-2 md:p-2 p-1 rounded-lg bg-gradient-to-r from-primary to-primary-dark hover:from-white hover:to-white hover:text-primary-dark 2xl:text-base text-sm "
                    onClick={() => {
                        if (onClickButton) {
                            onClickButton()
                        }
                    }}>
                    {buttonTitle === "edit" ?
                        <svg xmlns="http://www.w3.org/2000/svg" className="md:w-10 md:h-10 w-6 h-6" width="1em" height="1em" viewBox="0 0 36 36"><path fill="currentColor" d="M33.87 8.32L28 2.42a2.07 2.07 0 0 0-2.92 0L4.27 23.2l-1.9 8.2a2.06 2.06 0 0 0 2 2.5a2 2 0 0 0 .43 0l8.29-1.9l20.78-20.76a2.07 2.07 0 0 0 0-2.92M12.09 30.2l-7.77 1.63l1.77-7.62L21.66 8.7l6 6ZM29 13.25l-6-6l3.48-3.46l5.9 6Z" className="clr-i-outline clr-i-outline-path-1" /><path fill="none" d="M0 0h36v36H0z" /></svg>
                        : <svg xmlns="http://www.w3.org/2000/svg" className="md:w-10 md:h-10 w-6 h-6" width="1em" height="1em" viewBox="0 0 20 20"><g fill="currentColor"><path d="M5 11a1 1 0 1 1 0-2h10a1 1 0 1 1 0 2z" /><path d="M9 5a1 1 0 0 1 2 0v10a1 1 0 1 1-2 0z" /></g></svg>}
                </button>}
                <h2 className="2xl:text-[120px] xl:text-8xl text-5xl leading-none uppercase font-bold text-text text-end text-primary">{title}</h2>
            </div>
        </div>
        <img src="/images/title2.svg" alt="kulam" width={50} height={50} className="md:w-[100px] w-[60px] mx-auto absolute top-10 z-10 left-0" />
        <img src="/images/title2.svg" alt="kulam" width={50} height={50} className="md:w-[100px] w-[60px] mx-auto absolute top-0 z-10 md:-right-14 -right-8 rotate-180" />
    </div>

}