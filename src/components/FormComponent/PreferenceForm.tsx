import { useState } from "react";
import { toast } from "sonner";

// Custom Component
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { Switch } from "../ui/switch";

// Custom Component
import FormButton from "./FormButtons";
import FormHeader from "./FormHeader";

// Store
import { useFormStore } from "@/store/store";

// Constant
import { FormSection } from "@/shared/constant";

const MOCK_API_ENDPOINT =
  "https://api.mockfly.dev/mocks/5033b1f0-b10e-4d32-bebd-d888f8d80b7e/registration";

export default function PreferenceForm() {
  // State
  const [disable, setDisable] = useState(false);

  // Hooks
  const userPreference = useFormStore((state) => state.formInfo.userPreference);
  const formInfo = useFormStore((state) => state.formInfo);
  const setUserPreferences = useFormStore((state) => state.setUserPreferences);
  const setFormSections = useFormStore((state) => state.setFormSection);

  const submitForm = async (formInfo: any): Promise<any> => {
    try {
      setDisable(true);
      const response = await fetch(MOCK_API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formInfo),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      return await response.json();
    } catch (error) {
      console.error("Submit form error:", error);
    } finally {
      setDisable(false);
    }
  };

  const handleNext = () => {
    toast.promise(
      submitForm(formInfo).then((responseData) => {
        setFormSections(FormSection.Success);
      }),
      {
        loading: "Submitting form...",
        success: "Form successfully submitted!",
        error: "Form submission failed!",
      }
    );
  };

  return (
    <div className="flex flex-col">
      <FormHeader
        heading={"Preferences"}
        description={"Manage your preferences"}
      />
      <div className="flex flex-col space-y-4 mt-10">
        <Card className="flex flex-row justify-between w-full">
          <CardHeader>
            <h1 className="text-left font-medium">
              {"Alerts & Notifications"}
            </h1>
            <CardDescription>
              {"Manage how you receive alerts and updates"}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 content-center">
            <Switch
              disabled={disable}
              checked={userPreference.notificationSetting}
              onCheckedChange={(value: boolean) =>
                setUserPreferences({
                  ...userPreference,
                  notificationSetting: value,
                })
              }
            />
          </CardContent>
        </Card>
        <Card className="flex flex-row justify-between w-full">
          <CardHeader>
            <h1 className="text-left font-medium">{"Manage Privacy"}</h1>
            <CardDescription>
              {"Manage your data sharing preferences"}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 content-center">
            <Switch
              disabled={disable}
              checked={userPreference.privacySetting}
              onCheckedChange={(value: boolean) =>
                setUserPreferences({
                  ...userPreference,
                  privacySetting: value,
                })
              }
            />
          </CardContent>
        </Card>
      </div>
      <FormButton
        onPrevious={() => setFormSections(FormSection.ProfileInfo)}
        onNext={handleNext}
        disableNext={disable}
        disablePrevious={disable}
      />
    </div>
  );
}
