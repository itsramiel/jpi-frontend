import React from "react";
import { BaseInput, BaseInputProps } from "./BaseInput";

interface InputProps
  extends React.HTMLProps<HTMLInputElement>,
    Omit<BaseInputProps, "children"> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ fieldLabel, required, error, ...props }, forwardedRef) => {
    return (
      <BaseInput fieldLabel={fieldLabel} required={required} error={error}>
        {/* The extra div is just for the sake of password managers which add an extra element on top of input. If this container 
      has a gap, then there will be an extra space*/}
        <div>
          <input
            ref={forwardedRef}
            {...props}
            className="py-3 px-2 rounded-lg border border-gray-400"
          />
        </div>
      </BaseInput>
    );
  }
);

Input.displayName = "Input";
