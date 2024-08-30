"use client"
import { useEffect, useRef } from "react";

export default function Modal({ onClose, children, title, width, maxWidth, closeButton = true, overlayClass,
    showHeader = true, modalBodyClass = "", footer }) {
    const ref = useRef(null);

    useEffect(() => {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                onClose()
            }
        })

        const checkIfClickedOutside = (e) => {
            if (ref.current && (!ref.current.contains(e.target) || e.target?.className === 'custom-modal') && closeButton) {
                onClose()
            }
        };
        if (typeof window !== "undefined") {
            document.addEventListener('mousedown', checkIfClickedOutside);
            return () => {
                document.removeEventListener('mousedown', checkIfClickedOutside);
            };
        }
    }, []);


    return (<div className="relative z-[9999]" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className={`${overlayClass} fixed inset-0 bg-black bg-opacity-60 transition-opacity`}>
        </div>
        <div className="fixed inset-0 z-10 custom-modal">
            <div className="flex justify-center p-4 md:p-0">
                <div ref={ref} className={`custom-modal max-h-[90vh] overflow-hidden scrollbar-none relative transform overflow-y-visible rounded-lg text-left text-lg shadow-xl transition-all ${width ? width : "w-full"} ${maxWidth ? maxWidth : "max-w-[500px]"}  md:my-8`}>
                    {showHeader && <div className="bg-primary flex justify-between items-center rounded-t-lg z-50 border-b px-8 py-3 text-white">
                        <p className="capitalize">{title || "title"}</p>
                        {closeButton && <div onClick={() => { onClose() }} className="cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 56 56"><path fill="currentColor" d="M10.023 43.023c-.796.797-.82 2.157 0 2.954c.82.796 2.157.796 2.977 0l15-15l15 15c.797.796 2.156.82 2.977 0c.796-.82.796-2.157 0-2.954L30.953 28l15.024-15c.796-.797.82-2.156 0-2.953c-.844-.82-2.18-.82-2.977 0l-15 15l-15-15c-.82-.82-2.18-.844-2.977 0c-.796.82-.796 2.156 0 2.953l15 15Z" /></svg>
                        </div>}
                    </div>}
                    <div className={`${modalBodyClass} bg-white py-4 md:px-6 px-4 max-h-[90vh] overflow-y-auto custom-scrollbar flex flex-col justify-between`}>
                        {children}
                    </div>
                    {footer && <div className="bg-white border-t flex justify-end items-center gap-2 px-8 py-3">
                        {footer}
                    </div>}
                </div>
            </div>
        </div>
    </div>);
}