import React, { ReactElement } from "react";

export const Loader = (): ReactElement => {
  return (
    <div className="loader" role="progressbar">
      <div className="square square_one" />
    </div>
  );
};

// <div className="centering-block" role="progressbar">
//   <div className="loader centered">
//     <div className="square square_one"/>
//   </div>
// </div>
