"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import * as utils from "./utils";

interface FormData {
  coreConcept: string;
  industry: string;
  vibe: string;
  keywords: string;
}

interface FormContextType {
  currentStep: number;
  formData: FormData;
  names: string[];
  isLoading: boolean;
  completedSteps: Record<number, boolean>;
  setCurrentStep: (step: number) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  updateFormData: (key: keyof FormData, value: string) => void;
  generateNames: () => void;
  markStepAsCompleted: (step: number) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

interface Option {
  value: string;
  image: string;
  label?: string;
}

export const industries: Option[] = [
  { value: "Tech", image: "https://placehold.co/300x200/a4cafe/333?text=Tech" },
  {
    value: "Finance",
    image: "https://placehold.co/300x200/bbf7d0/333?text=Finance",
  },
  {
    value: "Health",
    image: "https://placehold.co/300x200/fecaca/333?text=Health",
  },
  {
    value: "Food",
    image: "https://placehold.co/300x200/fed7aa/333?text=Food",
    label: "Food & Drink",
  },
  {
    value: "Education",
    image: "https://placehold.co/300x200/c7d2fe/333?text=Education",
  },
  {
    value: "Creative",
    image: "https://placehold.co/300x200/f5d0fe/333?text=Creative",
    label: "Creative Arts",
  },
  {
    value: "E-commerce",
    image: "https://placehold.co/300x200/d1fae5/333?text=E-commerce",
  },
  {
    value: "Travel",
    image: "https://placehold.co/300x200/bae6fd/333?text=Travel",
  },
  {
    value: "Other",
    image: "https://placehold.co/300x200/e5e7eb/333?text=Other",
  },
];

export const vibes: Option[] = [
  {
    value: "Modern",
    image: "https://placehold.co/300x200/c4b5fd/333?text=Modern",
    label: "Modern ✨",
  },
  {
    value: "Playful",
    image: "https://placehold.co/300x200/fcd34d/333?text=Playful",
    label: "Playful 🎉",
  },
  {
    value: "Trustworthy",
    image: "https://placehold.co/300x200/a5f3fc/333?text=Trust",
    label: "Trustworthy 🤝",
  },
  {
    value: "Premium",
    image: "https://placehold.co/300x200/fecdd3/333?text=Premium",
    label: "Premium 💎",
  },
  {
    value: "Classic",
    image: "https://placehold.co/300x200/e5e7eb/333?text=Classic",
    label: "Classic 🏛️",
  },
  {
    value: "Techy",
    image: "https://placehold.co/300x200/dbeafe/333?text=Techy",
    label: "Techy 💡",
  },
];

export function FormProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    coreConcept: "",
    industry: "",
    vibe: "",
    keywords: "",
  });
  const [names, setNames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>(
    {}
  );

  const updateFormData = (key: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const validateCurrentStep = (): boolean => {
    switch (currentStep) {
      case 1:
        return !!formData.coreConcept.trim();
      case 2:
        return !!formData.industry;
      case 3:
        return !!formData.vibe;
      case 4:
        return true; // Keywords are optional
      default:
        return true;
    }
  };

  const markStepAsCompleted = (step: number) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [step]: true,
    }));
  };

  const goToNextStep = () => {
    if (!validateCurrentStep()) {
      const errorMessages = {
        1: "Please describe your core concept.",
        2: "Please select an industry.",
        3: "Please select a vibe.",
      };
      alert(errorMessages[currentStep as keyof typeof errorMessages]);
      return;
    }

    // Mark current step as completed
    markStepAsCompleted(currentStep);

    if (currentStep < 5) {
      if (currentStep === 4) {
        setFormData({
          ...formData,
          keywords: formData.keywords.trim() || "None specified",
        });
      }
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  const generateNames = () => {
    setIsLoading(true);
    // Simulate API call with setTimeout
    setTimeout(() => {
      const generatedNames = utils.generateNames(formData);
      setNames(generatedNames);
      setIsLoading(false);

      // Trigger confetti celebration after names appear
      setTimeout(() => {
        utils.triggerConfetti();
      }, 500);
    }, 1500);
  };
  return (
    <FormContext.Provider
      value={{
        currentStep,
        formData,
        names,
        isLoading,
        completedSteps,
        setCurrentStep,
        goToNextStep,
        goToPreviousStep,
        updateFormData,
        generateNames,
        markStepAsCompleted,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
}
