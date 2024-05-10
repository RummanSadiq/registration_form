// UI
import { Button } from "@/components/ui/button";

// Store
import { useFormStore } from "@/store/store";

// Constant
import { FormSection } from "@/shared/constant";

interface Props {
  onNext?: () => void;
  onPrevious?: () => void;
}

export default function FormButton({ onNext, onPrevious }: Props) {
  const formSection = useFormStore((state) => state.formSection);

  return (
    <div className="grid grid-cols-2 w-full max-w-[698px] pt-5">
      {formSection !== FormSection.UserDetail && (
        <Button variant={"outline"} className="h-14 w-24" onClick={onPrevious}>
          {"Previous"}
        </Button>
      )}
      <div className="flex justify-end col-start-2">
        <Button className="h-14 w-24" onClick={onNext} type="submit">
          {"Next"}
        </Button>
      </div>
    </div>
  );
}
