import Image from 'next/image'
import React from 'react'

function DesktopSideImages({ IMAGES = [] }) {
    return (<div className="md:block hidden">
        <div className="flex md:flex-col flex-row md:gap-10 gap-3">
            {IMAGES.map((e, i) => {
                return <div key={e.img}>
                    <Image src={`/images/${e.img}`} alt="1" width={225} height={224} className="rounded-xl md:w-full w-28 h-28 object-cover" />
                    <div className='text-base mt-1 leading-5 font-semibold text-background text-center line-clamp-2'>{e.title}</div>
                </div>
            })}

        </div>
    </div>)
}

export default DesktopSideImages
