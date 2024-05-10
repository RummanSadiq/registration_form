export default function FormHeader({
  heading,
  description,
}: {
  heading: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
        {heading}
      </h4>
      <p className="text-muted-foreground text-md">{description}</p>
    </div>
  );
}
