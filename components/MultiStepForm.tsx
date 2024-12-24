"use client";

import useFormStore from "@/store/formStore";
// import { motion } from "framer-motion";
import {motion} from "framer-motion";
import { useEffect, useState } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const stepVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};

export default function StepForm() {
  const { step, setStep, data, updateData } = useFormStore();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateStep = () => {
    const stepErrors: { [key: string]: string } = {};
    if (step === 1) {
      if (!data.personalInfo.name) stepErrors.name = "Name is required.";
      if (!data.personalInfo.email) stepErrors.email = "Email is required.";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.personalInfo.email))
        stepErrors.email = "Invalid email format.";
    } else if (step === 2) {
      if (!data.addressDetails.address)
        stepErrors.address = "Address is required.";
      if (!data.addressDetails.city) stepErrors.city = "City is required.";
    }
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (step < 4) setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const fetchUpdates = async () => {
    const res = await fetch("/api/update");
    const data = await res.json();
    updateData("personalInfo", data.personalInfo);
    updateData("addressDetails", data.addressDetails);
    updateData("preferences", data.preferences);
  };

  useEffect(() => {
    fetchUpdates();
  }, []);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <label className="block">
              <span className="text-gray-700">Name</span>
              <input
                type="text"
                value={data.personalInfo.name}
                onChange={(e) =>
                  updateData("personalInfo", { name: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              />
            </label>
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
            <label className="block">
              <span className="text-gray-700">Email</span>
              <input
                type="email"
                value={data.personalInfo.email}
                onChange={(e) =>
                  updateData("personalInfo", { email: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              />
            </label>
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <label className="block">
              <span className="text-gray-700">Address</span>
              <input
                type="text"
                value={data.addressDetails.address}
                onChange={(e) =>
                  updateData("addressDetails", { address: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              />
            </label>
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address}</p>
            )}
            <label className="block">
              <span className="text-gray-700">City</span>
              <input
                type="text"
                value={data.addressDetails.city}
                onChange={(e) =>
                  updateData("addressDetails", { city: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              />
            </label>
            {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={data.preferences.newsletter}
                onChange={(e) =>
                  updateData("preferences", { newsletter: e.target.checked })
                }
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              />
              <span className="ml-2 text-gray-700">Subscribe to Newsletter</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={data.preferences.notifications}
                onChange={(e) =>
                  updateData("preferences", { notifications: e.target.checked })
                }
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              />
              <span className="ml-2 text-gray-700">Enable Notifications</span>
            </label>
          </div>
        );
      case 4:
        return (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Review & Submit
            </h3>
            <pre className="p-4 bg-gray-100 rounded-md shadow-inner text-sm text-gray-800">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      key={step}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={stepVariants}
      transition={{ duration: 0.3 }}
      className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Step {step} of 4
      </h2>
      {renderStep()}
      <div className="flex justify-between">
        {step > 1 && (
          <button
            onClick={handlePrevious}
            className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300 transition duration-150"
          >
            <FaArrowLeft className="w-5 h-5 text-gray-700" />
            Back
          </button>
        )}
        {step < 4 && (
          <button
            onClick={handleNext}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition duration-150"
          >
            Next
            <FaArrowRight className="w-5 h-5 text-gray-700" />
          </button>
        )}
      </div>
    </motion.div>
  );
}
