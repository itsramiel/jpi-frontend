import React from "react";
import classNames from "classnames";

interface FilledImageProps
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {}

export function FilledImage(props: FilledImageProps) {
  return (
    <img
      {...props}
      className={classNames(
        "absolute inset-0 w-full h-full object-cover",
        props.className
      )}
    />
  );
}
