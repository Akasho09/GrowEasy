"use client";
import { useState, useEffect } from "react";
import { gsap } from "gsap";

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = ["red-400", "blue-400", "green-400", "yellow-400", "purple-400"];
  const gap = 10; // Adjust the gap between slides (in pixels)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3000); // Auto-slide every 2 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    gsap.to(".slide", {
      x: (i) => `${(i - currentIndex) * (100 + gap)}%`, // Adds gap to the slide movement
      opacity: (i) => (i === currentIndex ? 1 : 0.5), // Fade effect
      duration: 2,
      ease: "power2.inOut",
    });
  }, [currentIndex]);

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Slide Wrapper */}
      <div className="flex w-full h-2/3 justify-center items-center">
        {slides.map((color, i) => (
          <div
            key={i}
            className={`slide absolute w-2/3 h-2/3 bg-${color} flex items-center justify-center text-white text-2xl rounded-xl shadow-lg`}
            style={{
              transform: `translateX(${(i - currentIndex) * (100 + gap)}%)`,
              zIndex: i === currentIndex ? 2 : 1,
            }}
          >
            Slide {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
