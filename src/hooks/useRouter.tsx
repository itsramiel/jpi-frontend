import { useMemo } from "react";
import { isCurrentHref } from "@/utils";
import nProgress from "nprogress-support-rtl";
import { useSearchParams } from "next/navigation";
import { useRouter as useNextIntlRouter, usePathname } from "@/navigation";

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
