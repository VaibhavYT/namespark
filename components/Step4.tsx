"use client";
import { Input } from "@/components/ui/input";
import { useFormContext } from "@/lib/FormContext";
import { useFormElementAnimation } from "@/lib/animations";
import gsap from "gsap";
import { useRef, useEffect } from "react";

function Step4() {
  const { formData, updateFormData } = useFormContext();
  const formElementRef = useFormElementAnimation();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!inputRef.current) return;

    // Focus animation
    const input = inputRef.current;

    // Highlight the input with a short animation
    gsap.fromTo(
      input,
      { boxShadow: "0 0 0 rgba(59, 130, 246, 0)" },
      {
        boxShadow: "0 0 15px rgba(59, 130, 246, 0.3)",
        duration: 0.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: 1,
      }
    );

    // Focus the input after animation
    setTimeout(() => {
      input.focus();
    }, 600);

    // Add typing animation effect for placeholder
    const placeholderTexts = [
      "innovation",
      "connect",
      "flow",
      "insight",
      "green",
    ];
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;

    // Don't run the typing animation if user has entered content
    if (formData.keywords) return;

    const typeText = () => {
      const currentText = placeholderTexts[currentTextIndex];

      if (isDeleting) {
        currentCharIndex--;
        typingSpeed = 80;
      } else {
        currentCharIndex++;
        typingSpeed = 150;
      }

      const displayText = currentText.substring(0, currentCharIndex);
      if (input) input.setAttribute("placeholder", `e.g., ${displayText}`);

      if (!isDeleting && currentCharIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 800; // Pause before deleting
      } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentTextIndex = (currentTextIndex + 1) % placeholderTexts.length;
        typingSpeed = 500; // Pause before typing next word
      }

      const animId = setTimeout(typeText, typingSpeed);
      return animId;
    };

    const animationId = setTimeout(typeText, 1000);

    return () => {
      clearTimeout(animationId);
    };
  }, [formData.keywords]);
  return (
    <div ref={formElementRef}>
      <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
        4. Any Keywords? (Optional)
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Enter specific words you&apos;d like to include (comma-separated).
      </p>
      <Input
        ref={inputRef}
        type="text"
        value={formData.keywords}
        onChange={(e) => updateFormData("keywords", e.target.value)}
        className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 dark:bg-gray-800 dark:text-gray-100"
        placeholder="e.g., connect, flow, insight, green"
      />
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 italic">
        These words will inspire the name generation. Creative keywords lead to
        creative names!
      </p>
    </div>
  );
}

export default Step4;
