import React from "react";
import { BaseInput, BaseInputProps } from "./BaseInput";

interface InputProps
  extends React.HTMLProps<HTMLInputElement>,
    Omit<BaseInputProps, "children"> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ fieldLabel, required, error, ...props }, forwardedRef) => {
    return (
      <BaseInput fieldLabel={fieldLabel} required={required} error={error}>
        <input
          ref={forwardedRef}
          {...props}
          className="py-3 px-2 rounded-lg border border-gray-400"
        />
      </BaseInput>
    );
  }
);

Input.displayName = "Input";
