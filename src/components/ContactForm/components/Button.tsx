import { Ring } from "@uiball/loaders";
import { VariantProps, cva } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";
import { IconType } from "react-icons";

const button = cva("font-medium text-gray-50 rounded flex items-center gap-4", {
  variants: {
    loading: {
      true: "bg-gray-800",
      false: "bg-gray-950 hover:bg-gray-800",
    },
    size: {
      sm: "text-sm px-4 py-2",
      md: "text-md md:text-base px-4 md:px-6 py-4",
    },
  },
  defaultVariants: {
    size: "md",
    loading: false,
  },
});

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof button> {
  trailingIcon?: IconType;
  children: string;
}

export const Button = ({
  size,
  loading,
  children,
  className,
  trailingIcon: TrailingIcon,
  ...props
}: ButtonProps) => {
  return (
    <button
      disabled={loading ?? undefined}
      className={button({ size, loading })}
      {...props}
    >
      {loading ? <Ring color="white" size={24} /> : children}
      {TrailingIcon ? <TrailingIcon className="mirror" /> : null}
    </button>
  );
};
