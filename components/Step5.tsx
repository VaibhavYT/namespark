"use client";
import { useFormContext } from "@/lib/FormContext";
import { useFormElementAnimation } from "@/lib/animations";
import gsap from "gsap";
import { useRef, useEffect } from "react";

function Step5() {
  const { formData, names, isLoading, generateNames } = useFormContext();
  const formElementRef = useFormElementAnimation();
  const summaryRef = useRef<HTMLDivElement>(null);
  const namesContainerRef = useRef<HTMLDivElement>(null);

  // Function to copy name to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text.trim()).then(() => {
      // Optional: Add visual feedback for copying
      const nameElement = document.querySelector(
        `.name-card:nth-child(${names.indexOf(text) + 1}) h4`
      );
      if (nameElement) {
        gsap.fromTo(
          nameElement,
          { color: "#22c55e" /* text-green-500 */ },
          {
            color: "",
            duration: 1.5,
            ease: "power2.out",
          }
        );
      }
    });
  };

  // Animate elements when they appear
  useEffect(() => {
    if (!summaryRef.current) return;

    gsap.fromTo(
      summaryRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      }
    );
  }, []);

  // Animate names when they appear
  useEffect(() => {
    if (!namesContainerRef.current || isLoading || names.length === 0) return;

    const nameElements =
      namesContainerRef.current.querySelectorAll(".name-card");

    gsap.fromTo(
      nameElements,
      { opacity: 0, y: 20, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.15,
        duration: 0.6,
        ease: "back.out(1.2)",
        delay: 0.3,
      }
    );

    // Add hover animations to name cards
    nameElements.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          scale: 1.03,
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          duration: 0.2,
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          scale: 1,
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          duration: 0.2,
        });
      });

      card.addEventListener("click", () => {
        gsap.to(card, {
          backgroundColor: "#d1fae5",
          borderColor: "#10b981",
          duration: 0.3,
          yoyo: true,
          repeat: 1,
        });

        // Copy name to clipboard
        const name = card.textContent;
        if (name) {
          navigator.clipboard.writeText(name.trim()).then(() => {
            // Show "Copied!" tooltip
            const tooltip = document.createElement("div");
            tooltip.innerText = "Copied!";
            tooltip.className =
              "absolute top-0 right-0 bg-green-600 text-white text-xs px-2 py-1 rounded transform -translate-y-full";
            card.appendChild(tooltip);

            setTimeout(() => {
              tooltip.remove();
            }, 2000);
          });
        }
      });
    });

    return () => {
      nameElements.forEach((card) => {
        card.removeEventListener("mouseenter", () => {});
        card.removeEventListener("mouseleave", () => {});
        card.removeEventListener("click", () => {});
      });
    };
  }, [names, isLoading]);

  // Button click animation
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!buttonRef.current) return;

    const button = buttonRef.current;

    button.addEventListener("mouseenter", () => {
      gsap.to(button, {
        scale: 1.05,
        boxShadow: "0 10px 15px rgba(0,0,0,0.1)",
        duration: 0.2,
      });
    });

    button.addEventListener("mouseleave", () => {
      gsap.to(button, {
        scale: 1,
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        duration: 0.2,
      });
    });

    button.addEventListener("click", () => {
      gsap.to(button, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
      });
    });

    return () => {
      button.removeEventListener("mouseenter", () => {});
      button.removeEventListener("mouseleave", () => {});
      button.removeEventListener("click", () => {});
    };
  }, []);

  return (
    <div ref={formElementRef}>
      <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
        5. Ready to Spark?
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Review your inputs. Hit &apos;Generate Names&apos; when ready!
      </p>
      <div
        ref={summaryRef}
        className="space-y-3 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-700 mb-6 shadow-sm"
      >
        <p className="summary-item flex items-start">
          <span className="font-semibold text-gray-800 dark:text-gray-200 min-w-[80px]">
            Idea:
          </span>
          <span className="text-gray-700 dark:text-gray-300 ml-2">
            {formData.coreConcept}
          </span>
        </p>
        <p className="summary-item flex items-start">
          <span className="font-semibold text-gray-800 dark:text-gray-200 min-w-[80px]">
            Industry:
          </span>
          <span className="text-gray-700 dark:text-gray-300 ml-2">
            {formData.industry}
          </span>
        </p>
        <p className="summary-item flex items-start">
          <span className="font-semibold text-gray-800 dark:text-gray-200 min-w-[80px]">
            Vibe:
          </span>
          <span className="text-gray-700 dark:text-gray-300 ml-2">
            {formData.vibe}
          </span>
        </p>
        <p className="summary-item flex items-start">
          <span className="font-semibold text-gray-800 dark:text-gray-200 min-w-[80px]">
            Keywords:
          </span>
          <span className="text-gray-700 dark:text-gray-300 ml-2">
            {formData.keywords || "None specified"}
          </span>
        </p>
      </div>{" "}
      <div className="flex justify-end">
        <button
          ref={buttonRef}
          type="button"
          onClick={generateNames}
          className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 dark:from-green-600 dark:to-teal-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 relative overflow-hidden group"
          disabled={isLoading}
        >
          <span className="relative z-10 flex items-center">
            <span className="mr-2 transform group-hover:rotate-45 transition-transform duration-300">
              🚀
            </span>
            <span>{isLoading ? "Brewing Magic..." : "Generate Names"}</span>
          </span>
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-green-600 to-emerald-700 dark:from-green-500 dark:to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </button>
      </div>
      {isLoading || names.length > 0 ? (
        <div className="mt-8" ref={namesContainerRef}>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">
            Generated Names:
          </h3>{" "}
          <div className="space-y-3 text-gray-800 dark:text-gray-200">
            {isLoading ? (
              <div className="flex justify-center items-center p-8">
                <svg
                  className="animate-spin -ml-1 mr-3 h-6 w-6 text-green-600 dark:text-green-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span className="text-gray-600 text-lg">
                  Generating amazing names...
                </span>
              </div>
            ) : (
              names.map((name, index) => (
                <div
                  key={index}
                  className="name-card card-hover relative p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 group"
                >
                  <div className="flex justify-between items-center">
                    <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-200">
                      {name}
                    </h4>
                    <button
                      onClick={() => copyToClipboard(name)}
                      className="text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 focus:outline-none transition-colors duration-200"
                      aria-label="Copy to clipboard"
                    >
                      📋
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          {names.length > 0 && !isLoading && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
              Click on a name to copy it to your clipboard!
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default Step5;
