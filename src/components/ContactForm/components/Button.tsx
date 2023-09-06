import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
}

export const Button = ({
  children,
  onClick,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`px-6 py-4 bg-gray-950 hover:bg-gray-800 font-semibold text-gray-100 rounded ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
