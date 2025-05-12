"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

// Custom hook for handling step transitions
export function useStepAnimation(currentStep: number) {
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const stepsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prevStepRef = useRef<number>(currentStep);

  // Setup GSAP animations
  useLayoutEffect(() => {
    if (!stepsContainerRef.current) return;

    // Determine direction of transition
    const direction = currentStep > prevStepRef.current ? 1 : -1;
    const isFirstRender = prevStepRef.current === currentStep;

    // Create a context to handle GSAP animations cleanup
    const ctx = gsap.context(() => {
      // Check if we're in dark mode for appropriate shadow effects
      const isDark = document.documentElement.classList.contains("dark");
      const shadowColor = isDark ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.2)";

      // Get all step elements
      const steps = stepsRefs.current.filter(Boolean);

      // Initial setup for all steps
      if (isFirstRender) {
        gsap.set(steps, {
          opacity: 0,
          x: 100,
          scale: 0.95,
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          pointerEvents: "none",
          boxShadow: `0 5px 15px ${shadowColor}`,
          transformOrigin: direction > 0 ? "left center" : "right center",
        });

        // Only animate the first step on initial render
        if (steps[0]) {
          gsap.to(steps[0], {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.7,
            ease: "power2.out",
            pointerEvents: "auto",
            boxShadow: `0 0 0 transparent`,
          });
        }
      } else {
        // Get previous and current step elements
        const prevStep = steps[prevStepRef.current - 1];
        const currentStepEl = steps[currentStep - 1];

        // Set initial position for the entering step
        gsap.set(currentStepEl, {
          opacity: 0,
          x: 100 * direction,
          scale: 0.95,
          rotation: direction * 2,
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          pointerEvents: "none",
          boxShadow: `0 5px 15px ${shadowColor}`,
          transformOrigin: direction > 0 ? "left center" : "right center",
        });

        // Create a timeline for smooth transitions
        const tl = gsap.timeline();

        // Animate the previous step out
        tl.to(prevStep, {
          opacity: 0,
          x: -80 * direction,
          scale: 0.9,
          rotation: -direction * 2,
          duration: 0.5,
          ease: "power2.inOut",
          pointerEvents: "none",
        });

        // Animate the current step in
        tl.to(
          currentStepEl,
          {
            opacity: 1,
            x: 0,
            scale: 1,
            rotation: 0,
            duration: 0.5,
            ease: "power2.out",
            pointerEvents: "auto",
            boxShadow: `0 0 0 transparent`,
            delay: 0.1,
          },
          "-=0.3"
        ); // Overlap with previous animation
      }
    }, stepsContainerRef);

    // Update the previous step reference for the next render
    prevStepRef.current = currentStep;

    return () => ctx.revert(); // Cleanup
  }, [currentStep]);

  return { stepsContainerRef, stepsRefs };
}

// Animation for form elements as they appear
export function useFormElementAnimation() {
  const formElementRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useLayoutEffect(() => {
    if (!formElementRef.current || hasAnimated.current) return;

    const ctx = gsap.context(() => {
      // Get child elements
      const children = formElementRef.current?.children || [];
      const childElements = Array.from(children);

      // Check if we're in dark mode
      const isDark = document.documentElement.classList.contains("dark");

      // Create entry animation for the container
      gsap.fromTo(
        formElementRef.current,
        {
          y: 30,
          opacity: 0,
          scale: 0.95,
          boxShadow: `0 10px 25px -5px ${
            isDark ? "rgba(0, 0, 0, 0)" : "rgba(0, 0, 0, 0)"
          }`,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
          boxShadow: `0 10px 25px -5px ${
            isDark ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.1)"
          }`,
          clearProps: "boxShadow",
        }
      );

      // Staggered animation for headings and paragraphs
      const textElements = childElements.filter(
        (el) =>
          el.tagName === "H1" ||
          el.tagName === "H2" ||
          el.tagName === "H3" ||
          el.tagName === "P" ||
          (el.tagName === "DIV" &&
            !el.querySelector("input, textarea, button, select"))
      );

      gsap.fromTo(
        textElements,
        {
          y: 20,
          opacity: 0,
          scale: 0.95,
          transformOrigin: "left center",
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          delay: 0.2,
        }
      );

      // Special animation for input elements
      const inputElements = childElements.filter(
        (el) =>
          el.tagName === "INPUT" ||
          el.tagName === "TEXTAREA" ||
          el.tagName === "SELECT" ||
          el.querySelector("input, textarea, button, select")
      );

      gsap.fromTo(
        inputElements,
        {
          y: 20,
          opacity: 0,
          scale: 0.95,
          boxShadow: `0 0 0 2px ${
            isDark ? "rgba(59, 130, 246, 0)" : "rgba(59, 130, 246, 0)"
          }`,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.4,
          boxShadow: `0 0 0 2px ${
            isDark ? "rgba(59, 130, 246, 0.1)" : "rgba(59, 130, 246, 0.1)"
          }`,
          clearProps: "boxShadow",
          onComplete: () => {
            // Add subtle focus effect to the first input
            const firstInput = inputElements[0]?.querySelector(
              "input, textarea, select"
            );
            if (firstInput) {
              gsap.to(firstInput, {
                boxShadow: `0 0 0 2px ${
                  isDark ? "rgba(59, 130, 246, 0.3)" : "rgba(59, 130, 246, 0.3)"
                }`,
                duration: 0.5,
                ease: "power2.inOut",
                repeat: 1,
                yoyo: true,
                delay: 0.5,
              });
            }
          },
        }
      );

      hasAnimated.current = true;
    }, formElementRef);

    return () => ctx.revert();
  }, []);

  return formElementRef;
}

// Animation for highlighted elements
export function useHighlightAnimation() {
  const elementRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!elementRef.current) return;

    const ctx = gsap.context(() => {
      // Detect dark mode
      const isDark = document.documentElement.classList.contains("dark");

      // Subtle pulse animation - adjust glow color for dark mode
      gsap.to(elementRef.current, {
        boxShadow: isDark
          ? "0 0 15px rgba(96, 165, 250, 0.5)"
          : "0 0 15px rgba(59, 130, 246, 0.6)",
        scale: 1.02,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, elementRef);

    return () => ctx.revert();
  }, []);

  return elementRef;
}

// Progress bar animation
export function useProgressAnimation(progress: number) {
  const progressBarRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!progressBarRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(progressBarRef.current, {
        width: `${progress}%`,
        duration: 0.5,
        ease: "power2.inOut",
      });
    }, progressBarRef);

    return () => ctx.revert();
  }, [progress]);

  return progressBarRef;
}

// Button hover effect
export function useButtonHoverAnimation() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    if (!buttonRef.current) return;

    const button = buttonRef.current;

    const handleMouseEnter = () => {
      gsap.to(button, {
        scale: 1.05,
        duration: 0.2,
        ease: "power1.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.2,
        ease: "power1.in",
      });
    };

    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return buttonRef;
}

// Theme change animation
export function useThemeChangeAnimation() {
  const overlayRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!overlayRef.current) return;

    // Watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class" &&
          overlayRef.current
        ) {
          // Create a ripple effect when theme changes
          const isDark = document.documentElement.classList.contains("dark");

          gsap.fromTo(
            overlayRef.current,
            {
              opacity: 0.8,
              scale: 0,
              backgroundColor: isDark ? "#1f2937" : "#ffffff",
            },
            {
              opacity: 0,
              scale: 2,
              duration: 1.2,
              ease: "power3.out",
            }
          );
        }
      });
    });

    // Start observing document for theme class changes
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return overlayRef;
}

// Page transition animation
export function usePageTransition() {
  const pageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      // Create a smooth entrance animation
      gsap.fromTo(
        pageRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return pageRef;
}
