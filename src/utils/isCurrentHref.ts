export function isCurrentHref({
  currentPath,
  currentSearch,
  href,
}: {
  currentPath: string;
  currentSearch: string;
  href: string;
}) {
  const path = href.split("?")[0];
  const search = href.split("?")[1] ?? "";
  return currentPath === path && currentSearch === search;
}
