import { create } from "zustand";

// Types
import {
  FormInfo,
  ProfileInfo,
  UserDetail,
  UserPreference,
} from "@/types/form";

// Constant
import { FormSection } from "@/shared/constant";

type FormStore = {
  formInfo: FormInfo;
  progress: number;
  formSection: "userDetail" | "profileInfo" | "preferences" | "success";
  setUserDetail: (value: UserDetail) => void;
  setProfileInfo: (value: ProfileInfo) => void;
  setUserPreferences: (value: UserPreference) => void;
  setProgress: (value: number) => void;
  setFormSection: (
    value: "userDetail" | "profileInfo" | "preferences" | "success"
  ) => void;
};

export const useFormStore = create<FormStore>((set) => ({
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
  formSection: FormSection.UserDetail,
  setUserDetail: (value: UserDetail) => {
    set((state) => ({
      ...state,
      formInfo: {
        ...state.formInfo,
        userDetail: value,
      },
    }));
  },
  setProfileInfo: (value: ProfileInfo) => {
    set((state) => ({
      ...state,
      formInfo: {
        ...state.formInfo,
        profileInfo: value,
      },
    }));
  },
  setUserPreferences: (value: UserPreference) => {
    set((state) => ({
      ...state,
      formInfo: {
        ...state.formInfo,
        userPreference: value,
      },
    }));
  },
  setProgress: (value) => {
    set((state) => ({
      ...state,
      progress: value,
    }));
  },
  setFormSection: (value) => {
    set((state) => ({
      ...state,
      formSection: value,
    }));
  },
}));
