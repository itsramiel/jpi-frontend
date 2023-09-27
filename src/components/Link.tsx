"use client";

import NProgress from "nprogress-support-rtl";
import { ComponentProps } from "react";
import NextIntlLink from "next-intl/link";
import { isCurrentHref } from "@/utils";

export function Link(
  props: ComponentProps<typeof NextIntlLink> & { href: string }
) {
  return (
    <NextIntlLink
      {...props}
      onClick={(e) => {
        if (!isCurrentHref(props.href)) NProgress.start();
        props?.onClick?.(e);
      }}
    />
  );
}
