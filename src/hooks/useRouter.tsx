import { isCurrentHref } from "@/utils";
import { useRouter as useNextIntlRouter } from "next-intl/client";
import { usePathname, useSearchParams } from "next/navigation";
import nProgress from "nprogress-support-rtl";
import { useMemo } from "react";
export function useRouter(): ReturnType<typeof useNextIntlRouter> {
  const nextIntlRouter = useNextIntlRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  return useMemo(() => {
    return {
      ...nextIntlRouter,
      push(href, options) {
        if (
          !isCurrentHref({
            currentSearch: searchParams.toString(),
            currentPath: pathname,
            href: href,
          })
        )
          nProgress.start();
        nextIntlRouter.push(href, options);
      },
    };
  }, [nextIntlRouter, pathname, searchParams]);
}
