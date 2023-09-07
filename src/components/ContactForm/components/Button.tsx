import { Ring } from "@uiball/loaders";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean;
  children: string;
}

export const Button = ({
  loading,
  children,
  onClick,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      disabled={loading}
      className={`px-6 py-4 ${
        loading ? "bg-gray-800" : "bg-gray-950"
      } hover:bg-gray-800 font-semibold text-gray-100 rounded ${className}`}
      {...props}
    >
      {loading ? <Ring color="white" size={24} /> : children}
    </button>
  );
};
