import { useSearchParams } from "next/navigation";
import nProgress from "nprogress-support-rtl";
import { startTransition, useEffect } from "react";

import { usePathname } from "@/navigation";

export function NprogressController() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    startTransition(() => {
      nProgress.done();
    });
  }, [pathname, searchParams]);
  return null;
}
