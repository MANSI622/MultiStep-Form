import { create } from "zustand";

interface FormState {
  step: number;
  data: {
    personalInfo: {
      name: string;
      email: string;
    };
    addressDetails: {
      address: string;
      city: string;
    };
    preferences: {
      newsletter: boolean;
      notifications: boolean;
    };
  };
  setStep: (step: number) => void;
  updateData: (section: string, newData: object) => void;
}

const useFormStore = create<FormState>((set) => ({
  step: 1,
  data: {
    personalInfo: { name: "", email: "" },
    addressDetails: { address: "", city: "" },
    preferences: { newsletter: false, notifications: false },
  },
  setStep: (step) => set({ step }),
  updateData: (section, newData) =>
    set((state) => ({
      data: { ...state.data, [section]: { ...state.data[section], ...newData } },
    })),
}));

export default useFormStore;
