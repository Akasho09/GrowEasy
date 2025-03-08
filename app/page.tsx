"use client";
import { useState, useEffect } from "react";
import { gsap } from "gsap";
import Image from "next/image";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = ["", "/image2.png", "/image1.png", "/image.png", ""];
  const gap = 20;
  const slength = slides.length;

  useEffect(() => {
    if (currentIndex < slength - 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 3500);
      return () => clearInterval(interval);
    }
  }, [currentIndex, slength]);

  useEffect(() => {
    gsap.to(".slide", {
      x: (i) => `${(i - currentIndex) * (100 + gap)}%`,
      opacity: (i) => (i === currentIndex ? 1 : 0.5),
      scale: (i) => (i === currentIndex && i !== 0 ? 1.2 : 1),
      duration: 2.2,
      ease: "power2.inOut",
    });

    gsap.fromTo(
      ".barr",
      { backgroundColor: "gray" },
      {
        backgroundColor: (i) => (i === currentIndex - 1 ? "black" : "gray"),
        duration: 2.2,
        ease: "power2.Out",
      }
    );
  }, [currentIndex]);

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden px-4 md:px-8">
      <div className="flex w-full h-2/3 justify-center items-center max-w-screen-lg mx-auto">
        {slides.map((src, i) => (
          <div
            key={i}
            className="slide absolute h-2/3 flex items-center justify-center text-white text-xl md:text-2xl"
            style={{
              width: i === slides.length - 1 ? "100%" : "50%",
              transform: `translateX(${(i - currentIndex) * (100 + gap)}%)`,
              zIndex: i === currentIndex ? 2 : 1,
              backgroundColor: !src ? "red" : "",
            }}
          >
            <div className="h-full w-full md:w-2/3 flex items-center justify-center overflow-hidden">
              {src ? (
                <Image
                  src={src}
                  alt={`Image ${i + 1}`}
                  width={600}
                  height={800}
                  className="rounded-lg shadow-lg object-cover w-full h-full"
                />
              ) : (
                `Slide ${i + 1}`
              )}
            </div>
          </div>
        ))}
      </div>

      {currentIndex < slength - 1 && slength > 2 && (
        <div
          className={`absolute bottom-10 flex gap-4 transition-opacity duration-500 ${
            currentIndex === slength - 1 ? "opacity-0" : "opacity-100"
          }`}
        >
          {[...Array(slength - 2)].map((_, i) => (
            <div
              key={i}
              className={`barr w-6 md:w-8 h-2 rounded-full transition-colors duration-400`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
