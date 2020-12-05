import React, { ReactElement } from "react";
import { Die } from "./domain/Die";

export interface LoaderProps {
  dieType: Die;
}

export const Loader = ({ dieType }: LoaderProps): ReactElement => {
  // Type aliases cannot be used as a parameter type, so no [key: Die]
  // in other words....no dice! £pun
  const shapeMap: { [key: string]: string } = {
    d4: "triangle",
    d6: "square",
    d8: "diamond-narrow",
    d10: "diamond-wide",
    d12: "hexagon",
    d20: "hexagon-tall",
  };

  return (
    <div className={`loader loader-${dieType}`} role="progressbar" title={`${dieType}-spinner`}>
      <div className={`base-shape animation_roller ${shapeMap[dieType]}`}></div>
    </div>
  );
};
