// UI
import Image from "next/image";

// Custom Component
import FormHeader from "./FormHeader";

// Store
import { useFormStore } from "@/store/store";

const InfoList = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-row justify-between border-b last:border-b-0 py-2 gap-[15%]">
      <p className="font-semibold">{title}</p>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default function Success() {
  const { userDetail, profileInfo, userPreference } = useFormStore(
    (state) => state.formInfo
  );

  return (
    <div className="flex flex-col">
      <FormHeader
        heading="Submission Successful"
        description="Thank you! Your details have been successfully saved."
      />
      <div className="flex flex-col space-y-4 mt-10">
        {profileInfo.imageSrc && (
          <Image
            src={profileInfo.imageSrc as string}
            width={250}
            height={250}
            className="m-auto rounded-2xl"
            alt="uploaded-img"
          />
        )}
        <InfoList title={"Name"} description={userDetail.name} />
        <InfoList title={"Email"} description={userDetail.email} />
        {profileInfo.bio && (
          <InfoList title={"Bio"} description={profileInfo.bio} />
        )}
        <InfoList
          title={"Alerts & Notifications"}
          description={
            userPreference.notificationSetting ? "Enabled" : "Disabled"
          }
        />
        <InfoList
          title={"Privacy"}
          description={userPreference.privacySetting ? "Enabled" : "Disabled"}
        />
      </div>
    </div>
  );
}
