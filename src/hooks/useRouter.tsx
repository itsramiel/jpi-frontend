import { isCurrentHref } from "@/utils";
import { useRouter as useNextIntlRouter } from "next-intl/client";
import nProgress from "nprogress";
import { useMemo } from "react";
export function useRouter(): ReturnType<typeof useNextIntlRouter> {
  const nextIntlRouter = useNextIntlRouter();
  return useMemo(() => {
    return {
      ...nextIntlRouter,
      push(href, options) {
        if (!isCurrentHref(href)) nProgress.start();
        nextIntlRouter.push(href, options);
      },
    };
  }, [nextIntlRouter]);
}
