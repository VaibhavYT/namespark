import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "@/lib/FormContext";
import { useFormElementAnimation } from "@/lib/animations";

function Step1() {
  const { formData, updateFormData } = useFormContext();
  const formElementRef = useFormElementAnimation();
  return (
    <div ref={formElementRef}>
      <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
        1. What&apos;s the Big Idea?
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Describe your startup concept, product, or service.
      </p>
      <Textarea
        value={formData.coreConcept}
        onChange={(e) => updateFormData("coreConcept", e.target.value)}
        rows={4}
        className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 dark:bg-gray-800 dark:text-gray-100"
        placeholder="e.g., An AI platform that helps writers overcome creative block..."
      />
    </div>
  );
}

export default Step1;
