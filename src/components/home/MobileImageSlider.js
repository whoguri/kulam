"use client"
import Image from 'next/image';
import { useEffect, useRef } from 'react';

export default function MobileImageSlider({ IMAGES = [] }) {
    const sliderRef = useRef(null);

    useEffect(() => {
        const slider = sliderRef.current;
        const totalWidth = slider.scrollWidth / 2; // Total width of all images in the slider

        slider.style.setProperty('--total-width', `${totalWidth}px`);

        const clone = slider.innerHTML; // Clone the content
        slider.innerHTML += clone; // Append the cloned content

        const animation = slider.animate(
            [
                { transform: 'translateX(0)' },
                { transform: `translateX(-${totalWidth}px)` }
            ],
            {
                duration: 10000, // 10 seconds
                iterations: Infinity,
                easing: 'linear'
            }
        );

        return () => {
            animation.cancel(); // Clean up the animation on component unmount
        };
    }, []);

    return (
        <div className="md:hidden block">
            <div ref={sliderRef} className="slider-to-left flex md:flex-col flex-row md:gap-10 gap-3">
                {IMAGES.map((e, i) => {
                    return <Image key={i} src={`/images/${e}`} alt="1" width={225} height={224} className="rounded-xl md:w-full w-28 h-28 object-cover" />
                })}
            </div>
        </div>
    );
}
