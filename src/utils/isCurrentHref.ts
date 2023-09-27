export function isCurrentHref(href: string) {
  const path = href.split("?")[0];
  const search = href.split("?")[1] ?? "";
  return (
    window.location.pathname === path &&
    window.location.search.replace("?", "") === search
  );
}
