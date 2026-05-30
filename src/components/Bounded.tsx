import clsx from "clsx";

type BoundedProps = {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
  id?: string;
};

export const Bounded = ({
  as: Comp = "section",
  className,
  children,
  id,
  ...restProps
}: BoundedProps) => {
  return (
    <Comp
      id={id}
      className={clsx("px-4 first:pt-10 md:px-6", className)}
      {...restProps}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center">
        {children}
      </div>
    </Comp>
  );
};
