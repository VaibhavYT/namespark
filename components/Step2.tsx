"use client";
import { useFormContext } from "@/lib/FormContext";
import { industries } from "@/lib/FormContext";
import { useFormElementAnimation } from "@/lib/animations";
import gsap from "gsap";
import { useRef, useEffect } from "react";

function Step2() {
  const { formData, updateFormData } = useFormContext();
  const formElementRef = useFormElementAnimation();
  const cardsRef = useRef<HTMLDivElement>(null);

  // Add animation for cards
  useEffect(() => {
    if (!cardsRef.current) return;

    const cards = Array.from(
      cardsRef.current.querySelectorAll(".input-card")
    ) as HTMLElement[];

    gsap.fromTo(
      cards,
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: "power3.out",
        delay: 0.1, // Slight delay for form transition
      }
    );

    cards.forEach((card) => {
      const initialBoxShadow =
        card.style.boxShadow || "0 4px 6px rgba(0,0,0,0.1)";
      card.addEventListener("mouseenter", () => {
        const isDarkMode = document.documentElement.classList.contains("dark");
        gsap.to(card, {
          scale: 1.04,
          boxShadow: isDarkMode
            ? "0 10px 20px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1)"
            : "0 10px 20px rgba(0,0,0,0.12)",
          duration: 0.25,
          ease: "power2.out",
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          scale: 1,
          boxShadow: initialBoxShadow,
          duration: 0.25,
          ease: "power2.out",
        });
      });
    });

    return () => {
      cards.forEach((card) => {
        // It's good practice to store the handler function to remove the exact one
        // For simplicity here, but in complex scenarios, store handlers.
        card.removeEventListener("mouseenter", () => {});
        card.removeEventListener("mouseleave", () => {});
      });
    };
  }, []);
  return (
    <div ref={formElementRef}>
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
        2. What&apos;s Your Field?
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm sm:text-base">
        Select the industry that best fits your startup.
      </p>
      <div
        ref={cardsRef}
        className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5"
      >
        {industries.map((option) => (
          <div
            key={option.value}
            className={`input-card card-hover relative rounded-lg shadow-lg overflow-hidden cursor-pointer aspect-[3/2] flex flex-col justify-end group
              transition-all duration-300 ease-out
              ${
                formData.industry === option.value
                  ? "ring-2 ring-offset-2 ring-blue-500 dark:ring-blue-400 ring-offset-background dark:ring-offset-gray-800 scale-[1.02]"
                  : "hover:shadow-xl dark:hover:shadow-2xl"
              }`}
            onClick={() => updateFormData("industry", option.value)}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-out group-hover:scale-105"
              style={{ backgroundImage: `url(${option.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
            <div className="relative p-3 sm:p-4 text-center text-white z-10">
              <span className="font-semibold text-sm sm:text-base leading-tight">
                {option.label || option.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Step2;
