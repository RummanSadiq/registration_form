import { create } from "zustand";

// Types
import { FormInfo } from "@/types/form";

type FormStore = {
  formInfo: FormInfo;
  progress: number;
};

const initialState: FormStore = {
  formInfo: {
    userDetail: {
      name: "",
      email: "",
      password: "",
    },
    profileInfo: {
      bio: "",
      imageSrc: "",
    },
    userPreference: {
      notificationSetting: false,
      privacySetting: false,
    },
  },
  progress: 0,
};

export const useFormStore = create<FormStore>((set) => ({
  ...initialState,
}));
