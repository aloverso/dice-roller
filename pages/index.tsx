/* eslint-disable react-hooks/exhaustive-deps */

import React, { ReactElement } from "react";
import { Roller } from "../src/Roller";
import { ApiClient } from "../src/ApiClient";

const Index = (): ReactElement => {
  return <Roller client={ApiClient()} />;
};

export default Index;
