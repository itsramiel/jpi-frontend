import { Ring } from "@uiball/loaders";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "base";
  loading?: boolean;
  children: string;
}

export const Button = ({
  size = "base",
  loading = false,
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      disabled={loading}
      className={`${size === "base" ? "px-6 py-4" : "px-4 py-2 text-sm"} ${
        loading ? "bg-gray-800" : "bg-gray-950"
      } hover:bg-gray-800 font-semibold text-gray-100 rounded ${className}`}
      {...props}
    >
      {loading ? <Ring color="white" size={24} /> : children}
    </button>
  );
};
