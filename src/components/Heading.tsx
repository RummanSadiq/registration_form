interface Props {
  title: string;
  description: string;
}

export default function Heading({ title, description }: Props) {
  return (
    <div className="flex flex-col text-center pb-10 gap-3">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {title}
      </h1>
      <p className="text-xl text-muted-foreground">{description}</p>
    </div>
  );
}
