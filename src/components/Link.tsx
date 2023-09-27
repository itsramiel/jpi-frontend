"use client";

import NProgress from "nprogress-support-rtl";
import { ComponentProps } from "react";
import NextIntlLink from "next-intl/link";
import { isCurrentHref } from "@/utils";
import { useSearchParams } from "next/navigation";
import { usePathname } from "next-intl/client";

export function Link(
  props: ComponentProps<typeof NextIntlLink> & { href: string }
) {
  const search = useSearchParams();
  const pathname = usePathname();
  return (
    <NextIntlLink
      {...props}
      onClick={(e) => {
        if (
          !isCurrentHref({
            currentSearch: search.toString(),
            currentPath: pathname,
            href: props.href,
          })
        )
          NProgress.start();
        props?.onClick?.(e);
      }}
    />
  );
}
