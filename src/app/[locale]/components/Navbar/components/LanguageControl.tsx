"use client";
import { useRouter } from "@/hooks";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import classNames from "classnames";
import { useLocale } from "next-intl";
import { IoCheckmark, IoChevronDown, IoLanguage } from "react-icons/io5";

const languages = [
  { id: "en", name: "English" },
  { id: "ar", name: "عربي" },
];

export function LanguageControl() {
  const locale = useLocale();
  const router = useRouter();

  const onLocaleChange = (locale: string) => {
    router.push("/", { locale });
  };

  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger asChild>
        <button
          aria-label="change language"
          className="flex items-center gap-2 [&_svg]:w-4 [&_svg]:h-4 text-gray-700 outline-none"
        >
          <IoLanguage />
          <span className="text-gray-600 font-medium">
            {languages.find((lang) => lang.id === locale)?.name}
          </span>
          <IoChevronDown />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="relative z-10 bg-white rounded p-2 shadow-[0_0_8px_rgba(0,0,0,0.3)]">
          <DropdownMenu.RadioGroup
            value={locale}
            onValueChange={onLocaleChange}
          >
            {languages.map((language) => (
              <DropdownMenu.RadioItem
                value={language.id}
                key={language.id}
                className={classNames(
                  "flex gap-2 p-2 items-center justify-center select-none outline-none cursor-pointer rounded text-sm",
                  "text-gray-700 data-[highlighted]:text-gray-100 bg-white data-[highlighted]:bg-gray-950"
                )}
              >
                <DropdownMenu.ItemIndicator>
                  <IoCheckmark className="h-3 w-3" />
                </DropdownMenu.ItemIndicator>
                {language.name}
              </DropdownMenu.RadioItem>
            ))}
          </DropdownMenu.RadioGroup>
          <DropdownMenu.Arrow className="fill-white" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
