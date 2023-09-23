import React, { ComponentRef, useRef } from "react";
import * as RadixSelect from "@radix-ui/react-select";
import { IoCheckmark, IoChevronDown, IoChevronUp } from "react-icons/io5";

interface FilterProps {
  placeholder: NonNullable<RadixSelect.SelectValueProps["placeholder"]>;
  children: React.ReactNode;
  onValueChange: (value: string) => void;
  value: string;
  display?: string;
}

export function Select({
  children,
  onValueChange,
  value,
  placeholder,
  display,
}: FilterProps) {
  return (
    <RadixSelect.Root value={value} onValueChange={onValueChange}>
      <RadixSelect.Trigger className="bg-zinc-100 rounded flex items-center py-2 px-2 gap-2 border-black text-sm text-gray-700 data-[placeholder]:text-gray-500">
        <RadixSelect.Value placeholder={placeholder}>
          {display}
        </RadixSelect.Value>
        <RadixSelect.Icon>
          <IoChevronDown className="w-3 h-3" />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content
          className="bg-zinc-100 rounded shadow-black/20 shadow"
          ref={(ref) =>
            ref?.addEventListener("touchend", (e) => e.preventDefault())
          }
        >
          <RadixSelect.ScrollUpButton className="flex flex-col items-center text-gray-700">
            <IoChevronUp />
          </RadixSelect.ScrollUpButton>

          <RadixSelect.Viewport className="p-1">
            {children}
          </RadixSelect.Viewport>

          <RadixSelect.ScrollDownButton className="flex flex-col items-center text-gray-700">
            <IoChevronDown />
          </RadixSelect.ScrollDownButton>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
}

export const SelectSeparator = () => (
  <RadixSelect.Separator className="h-[1px] bg-gray-300" />
);

export const SelectItem = React.forwardRef<
  ComponentRef<typeof RadixSelect.SelectItem>,
  RadixSelect.SelectItemProps
>(({ children, className, ...props }, forwardedRef) => {
  return (
    <RadixSelect.Item
      {...props}
      ref={forwardedRef}
      className="flex items-center rounded select-none gap-4 p-2 text-sm text-gray-700 data-[highlighted]:text-gray-100 bg-zinc-100 data-[highlighted]:bg-zinc-900 data-[highlighted]:outline-none focus:outline-none"
    >
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
      <RadixSelect.ItemIndicator className="SelectItemIndicator">
        <IoCheckmark className="w-3 h3" />
      </RadixSelect.ItemIndicator>
    </RadixSelect.Item>
  );
});

SelectItem.displayName = "SelectItem";
