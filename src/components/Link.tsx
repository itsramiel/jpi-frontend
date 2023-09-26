"use client";

import NProgress from "nprogress";
import { ComponentProps } from "react";
import NextIntlLink from "next-intl/link";

export function Link(props: ComponentProps<typeof NextIntlLink>) {
  return (
    <NextIntlLink
      {...props}
      onClick={(e) => {
        NProgress.start();
        props?.onClick?.(e);
      }}
    />
  );
}
