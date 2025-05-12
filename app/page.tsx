"use client";
import NameSparkForm from "../components/NameSparkForm";
import { FormProvider } from "../lib/FormContext";
import { usePageTransition } from "@/lib/animations";

export default function Home() {
  const pageRef = usePageTransition();

  return (
    <main
      ref={pageRef}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-blue-950 py-12"
    >
      <div className="container mx-auto px-4">
        <FormProvider>
          <NameSparkForm />
        </FormProvider>
      </div>
    </main>
  );
}
