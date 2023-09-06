import React from "react";

export interface BaseInputProps {
  fieldLabel: string;
  children: React.ReactNode;
  required?: boolean;
  error?: string;
}

export const BaseInput = ({
  fieldLabel,
  required,
  error,
  children,
}: BaseInputProps) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <p className="text-gray-800 font-semibold">
          {fieldLabel + (required ? " *" : "")}
        </p>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
      </div>
      {children}
    </div>
  );
};
