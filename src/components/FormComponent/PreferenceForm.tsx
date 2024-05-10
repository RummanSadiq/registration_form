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

export default function PreferenceForm() {
  // Hooks
  const userPreference = useFormStore((state) => state.formInfo.userPreference);
  const setUserPreferences = useFormStore((state) => state.setUserPreferences);
  const setFormSections = useFormStore((state) => state.setFormSection);

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
        onNext={() => setFormSections(FormSection.Success)}
      />
    </div>
  );
}
