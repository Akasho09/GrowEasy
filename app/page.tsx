"use client";
import { useState, useEffect } from "react";
import { gsap } from "gsap";
import Image from "next/image";

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  // const slides = ["#f87171", "#60a5fa", "#34d399", "#facc15", "#a855f7"];
  const slides=  [ "" ,"/image.png"  , "/image1.png" , "/image2.png" , ""];
  const gap = 20;
  const slideDuration = 3000; // 3 seconds per slide
  const slength = slides.length

  useEffect(() => {
    if(currentIndex< slength-1){
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) );
      }, slideDuration);
    return () => clearInterval(interval);
    }
  }, [currentIndex , slength]);

  useEffect(() => {
    gsap.to(".slide", {
      x: (i) => `${(i - currentIndex) * (100 + gap)}%`,
      opacity: (i) => (i === currentIndex ? 1 : 0.5),
      scale: (i) => (i === currentIndex && i !== 0 ? 1.2 : 1),
      duration: 2,
      ease: "power2.inOut",
    });
  }, [currentIndex]);

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Slide Wrapper */}
      {/* <div className="flex w-full h-2/3 justify-center items-center">
        {slides.map((color, i) => (
          // <img src={`${color}`} alt="images" />/
          // <Image src={color} alt={color} width={400} height={400} key={i}></Image>
          <div
            key={i}
            className={`slide absolute h-2/3 flex items-center justify-center text-white text-2xl rounded-xl shadow-lg`}
            style={{
              width: i === slides.length - 1 ? "100%" : "50%",
              backgroundColor: color,
              transform: `translateX(${(i - currentIndex) * (100 + gap)}%)`,
              zIndex: i === currentIndex ? 2 : 1,
            }}
          >
        <Image src={color} alt={color} width={400} height={400} key={i}></Image>
          </div>
        ))}
      </div> */}
<div className="flex w-full h-2/3 justify-center items-center">
      {slides.map((src, i) => (
       <div
       key={i}
       className={`slide absolute h-2/3 flex items-center justify-center text-white text-2xl rounded-xl shadow-lg`}
       >
        {!src ?     <div
            key={i}
            className={`slide absolute h-2/3 flex items-center justify-center text-white text-2xl rounded-xl shadow-lg`}
            style={{
              width: i === slides.length - 1 ? "100%" : "50%",
              transform: `translateX(${(i - currentIndex) * (100 + gap)}%)`,
              zIndex: i === currentIndex ? 2 : 1,
            }}
          >        </div>
          :  <Image 
          key={i}
          src={src} 
          alt={`Slide ${i + 1}`}
          width={400} // Adjust size as needed
          height={400} 
          className="rounded-lg shadow-lg object-cover"
        />
        }
        </div>
      ))}
    </div>
     {
      (currentIndex < slength  - 1 && slength  > 2 && <div     className={`absolute bottom-10 flex gap-2 transition-opacity duration-500 ${
        currentIndex === slength  - 1 ? "opacity-0" : "opacity-100"
      } gap-4`}>
        {[...Array(slength  - 2)].map((_, i) => (
          <div
            key={i} 
            className={`w-8 h-2 rounded-full transition-all duration-300 ${
              i === currentIndex-1 ? "bg-gray-400 scale-125" : "bg-gray-100"
            }`}
          />
        ))}
      </div> )
     }
    </div>
  );
}
