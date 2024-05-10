/* eslint-disable @next/next/no-img-element */
import { ChangeEvent, useRef } from "react";
import Image from "next/image";

// Custom Component
import FormHeader from "./FormHeader";
import FormButton from "./FormButtons";

// UI
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

// Store
import { useFormStore } from "@/store/store";

// Constant
import { FormSection } from "@/shared/constant";

export default function ProfileInfoForm() {
  // Hooks
  const profileInfo = useFormStore((state) => state.formInfo.profileInfo);
  const setProfileInfo = useFormStore((state) => state.setProfileInfo);
  const setFormSections = useFormStore((state) => state.setFormSection);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Vars
  const { bio, imageSrc } = profileInfo;

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();
    reader.onload = () => {
      setProfileInfo({ ...profileInfo, imageSrc: reader.result });
    };
    reader.readAsDataURL(file as Blob);
  };

  return (
    <div className="flex flex-col">
      <FormHeader
        heading={"Profile Information"}
        description="This is how others will see you on the site"
      />
      <div className="flex flex-col lg:flex-row gap-4 mt-10 mb-4">
        <div className="flex flex-col gap-3 w-full">
          <Label>{"Upload Image"}</Label>
          <input
            type="file"
            id="file"
            accept="image/*"
            className="hidden"
            ref={inputRef}
            onChange={handleFileChange}
          />
          {!imageSrc && (
            <div
              className="flex flex-col gap-2 items-center overflow-hidden rounded-2xl h-fit border p-6"
              onClick={handleButtonClick}
            >
              <Image
                src={"/images/upload.svg"}
                width={100}
                height={100}
                alt="upload-icon"
              />
              <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                {"Upload Image"}
              </h4>
            </div>
          )}
          {!!imageSrc && (
            <div className="rounded-2xl h-fit">
              <img
                src={imageSrc as string}
                alt="uploaded-image"
                className="rounded-2xl"
              />
            </div>
          )}
          <Button variant={"outline"} onClick={handleButtonClick}>
            {"Select Image"}
          </Button>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <Label htmlFor="bio">{"Bio"}</Label>
          <Textarea
            placeholder="Enter your bio"
            className="focus:border-none"
            value={bio}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
              setProfileInfo({ ...profileInfo, bio: event.target.value })
            }
          />
        </div>
      </div>
      <FormButton
        onPrevious={() => setFormSections(FormSection.UserDetail)}
        onNext={() => setFormSections(FormSection.Preferences)}
      />
    </div>
  );
}
