import React from "react";
import { BaseInput, BaseInputProps } from "./BaseInput";

interface TextAreaInputProps
  extends React.HTMLProps<HTMLTextAreaElement>,
    Omit<BaseInputProps, "children"> {}

export const TextAreaInput = React.forwardRef<
  HTMLTextAreaElement,
  TextAreaInputProps
>(({ fieldLabel, error, required, ...props }, forwardedRef) => {
  return (
    <BaseInput fieldLabel={fieldLabel} error={error} required={required}>
      <textarea
        ref={forwardedRef}
        {...props}
        className="w-full py-3 px-2 rounded-lg border border-gray-400 h-36 resize-none"
      />
    </BaseInput>
  );
});

TextAreaInput.displayName = " TextAreaInput";
