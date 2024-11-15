import { Ring } from "@uiball/loaders";
import { IconType } from "react-icons";
import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { VariantProps, cva } from "class-variance-authority";

import { Link } from "./Link";

const button = cva(
  "font-medium text-gray-50 rounded flex items-center justify-center gap-4",
  {
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
  }
);

interface BaseButtonProps extends VariantProps<typeof button> {
  trailingIcon?: IconType;
  children: string;
}

interface ButtonAsButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: never;
}
interface ButtonAsLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

type ButtonProps = BaseButtonProps & (ButtonAsLinkProps | ButtonAsButtonProps);

export const Button = ({
  size,
  loading,
  children,
  className,
  trailingIcon: TrailingIcon,
  ...props
}: ButtonProps) => {
  if (props.href !== undefined) {
    return (
      <Link className={button({ size, loading, className })} {...props}>
        {loading ? <Ring color="white" size={24} /> : children}
        {TrailingIcon ? <TrailingIcon className="mirror" /> : null}
      </Link>
    );
  }

  return (
    <button
      disabled={loading ?? undefined}
      className={button({ size, loading, className })}
      {...props}
    >
      {loading ? <Ring color="white" size={24} /> : children}
      {TrailingIcon ? <TrailingIcon className="mirror" /> : null}
    </button>
  );
};
