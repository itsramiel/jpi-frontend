"use client";

import NProgress from "nprogress-support-rtl";
import { ComponentProps } from "react";
import { isCurrentHref } from "@/utils";
import { useSearchParams } from "next/navigation";
import { usePathname, Link as NextIntlLink } from "@/navigation";

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
