"use client";
import { useFormContext } from "@/lib/FormContext";
import { vibes } from "@/lib/FormContext";
import { useFormElementAnimation } from "@/lib/animations";
import gsap from "gsap";
import { useRef, useEffect } from "react";

function Step3() {
  const { formData, updateFormData } = useFormContext();
  const formElementRef = useFormElementAnimation();
  const cardsRef = useRef<HTMLDivElement>(null);

  // Add animation for cards
  useEffect(() => {
    if (!cardsRef.current) return;

    const cards = cardsRef.current.querySelectorAll(".vibe-card");

    gsap.fromTo(
      cards,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        stagger: 0.15,
        duration: 0.5,
        ease: "back.out(1.2)",
      }
    ); // Add hover and click animations
    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        // Detect if we're in dark mode
        const isDarkMode = document.documentElement.classList.contains("dark");

        gsap.to(card, {
          y: -5,
          boxShadow: isDarkMode
            ? "0 15px 30px rgba(0,0,0,0.4)"
            : "0 15px 30px rgba(0,0,0,0.1)",
          duration: 0.3,
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          y: 0,
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          duration: 0.3,
        });
      });

      card.addEventListener("click", () => {
        gsap.to(card, {
          scale: 0.95,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
        });
      });
    });

    return () => {
      cards.forEach((card) => {
        card.removeEventListener("mouseenter", () => {});
        card.removeEventListener("mouseleave", () => {});
        card.removeEventListener("click", () => {});
      });
    };
  }, []);
  return (
    <div ref={formElementRef}>
      <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
        3. What&apos;s the Vibe?
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        How should your startup name feel? Choose one.
      </p>
      <div ref={cardsRef} className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {vibes.map((option) => (
          <div
            key={option.value}
            className={`vibe-card card-hover relative rounded-xl shadow-md overflow-hidden cursor-pointer ${
              formData.vibe === option.value
                ? "ring-2 ring-indigo-500 dark:ring-indigo-400 ring-offset-2 dark:ring-offset-gray-800"
                : ""
            }`}
            onClick={() => updateFormData("vibe", option.value)}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${option.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-3 text-center text-white">
              <span className="font-semibold text-sm">
                {option.label || option.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Step3;
