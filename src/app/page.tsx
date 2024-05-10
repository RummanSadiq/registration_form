"use client";

import { useCallback } from "react";

// UI
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

// Custom Component
import Heading from "@/components/Heading";
import ProfileInfoForm from "@/components/FormComponent/ProfileInfoForm";
import PreferenceForm from "@/components/FormComponent/PreferenceForm";
import Success from "@/components/FormComponent/Success";
import UserDetailForm from "@/components/FormComponent/UserDetailForm";

// Store
import { useFormStore } from "@/store/store";

// Constant
import { FormSection } from "@/shared/constant";

export default function Home() {
  const formSection = useFormStore((state) => state.formSection);

  const getProgress = useCallback((): number => {
    switch (formSection) {
      case FormSection.UserDetail:
        return 25;
      case FormSection.ProfileInfo:
        return 50;
      case FormSection.Preferences:
        return 75;
      case FormSection.Success:
        return 100;
      default:
        return 0;
    }
  }, [formSection]);

  return (
    <div className="px-4 py-[13.25%] pb-[22%] flex flex-col items-center">
      <Heading
        title={"Registration Form"}
        description={"Please fill the form carefully for registration"}
      />
      <div className="rounded-xl border shadow-md py-8 px-10 flex flex-col w-full max-w-[698px]">
        <Progress value={getProgress()} className="w-full" />
        <Separator className="my-8" />
        {formSection === FormSection.UserDetail && <UserDetailForm />}
        {formSection === FormSection.ProfileInfo && <ProfileInfoForm />}
        {formSection === FormSection.Preferences && <PreferenceForm />}
        {formSection === FormSection.Success && <Success />}
      </div>
    </div>
  );
}
