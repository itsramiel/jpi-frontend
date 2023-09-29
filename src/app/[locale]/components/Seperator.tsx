import classNames from "classnames";

export function Seperator({ className }: { className?: string }) {
  return <hr className={classNames("border-gray-950/10 border", className)} />;
}
