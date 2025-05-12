"use client";
import { useFormContext } from "@/lib/FormContext";
import { useStepAnimation, useProgressAnimation } from "@/lib/animations";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import { Button } from "./ui/button";

function NameSparkForm() {
  const { currentStep, completedSteps, goToNextStep, goToPreviousStep } =
    useFormContext();

  // Animation hooks
  const { stepsContainerRef, stepsRefs } = useStepAnimation(currentStep);
  const progressBarRef = useProgressAnimation(currentStep * 20);

  // Register each step component ref
  const registerStepRef = (index: number) => (el: HTMLDivElement | null) => {
    stepsRefs.current[index] = el;
  };
  return (
    <div className="max-w-3xl mx-auto p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700 relative overflow-hidden">
      {/* Background gradient circles */}
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-blue-100 dark:bg-blue-900 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-indigo-100 dark:bg-indigo-900 rounded-full opacity-20 blur-3xl"></div>

      <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent mb-6">
        Let&apos;s Spark Your Startup Name! ✨
      </h1>
      {/* Step indicator */}
      <div className="flex justify-center mb-8">
        {[1, 2, 3, 4, 5].map((step) => (
          <div
            key={step}
            className={`relative flex items-center justify-center w-10 h-10 rounded-full mx-1 text-sm font-medium transition-all duration-300
                      ${
                        currentStep === step
                          ? "bg-blue-600 text-white shadow-lg scale-110"
                          : step < currentStep
                          ? completedSteps[step]
                            ? "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 ring-2 ring-green-400 dark:ring-green-700"
                            : "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500"
                      }`}
          >
            {step < currentStep && completedSteps[step] ? (
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              step
            )}
            {step < 5 && (
              <div
                className={`absolute top-1/2 -right-3 w-4 h-0.5 transition-all duration-300
                            ${
                              step < currentStep
                                ? completedSteps[step]
                                  ? "bg-green-400 dark:bg-green-600"
                                  : "bg-blue-400 dark:bg-blue-600"
                                : "bg-gray-200 dark:bg-gray-600"
                            }`}
              ></div>
            )}
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-100 rounded-full mb-8 overflow-hidden">
        <div
          ref={progressBarRef}
          className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
          style={{ width: `${currentStep * 20}%` }}
        ></div>
      </div>

      {/* Steps container with animations */}
      <div ref={stepsContainerRef} className="relative min-h-[300px]">
        <div ref={registerStepRef(0)} className="step">
          <Step1 />
        </div>

        <div ref={registerStepRef(1)} className="step">
          <Step2 />
        </div>

        <div ref={registerStepRef(2)} className="step">
          <Step3 />
        </div>

        <div ref={registerStepRef(3)} className="step">
          <Step4 />
        </div>

        <div ref={registerStepRef(4)} className="step">
          <Step5 />
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="mt-8 flex justify-between">
        {" "}
        {currentStep > 1 && (
          <Button
            variant="outline"
            onClick={goToPreviousStep}
            className="px-6 py-2 border border-gray-300 dark:border-gray-700 rounded-lg group transition-all duration-300"
          >
            <span className="mr-2 group-hover:-translate-x-1 inline-block transition-transform duration-200">
              ←
            </span>
            Back
          </Button>
        )}
        {currentStep < 5 && (
          <Button
            onClick={goToNextStep}
            className="ml-auto px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group"
          >
            Continue
            <span className="ml-2 group-hover:translate-x-1 inline-block transition-transform duration-200">
              →
            </span>
          </Button>
        )}
      </div>
    </div>
  );
}

export default NameSparkForm;
