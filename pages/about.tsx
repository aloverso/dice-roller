/* eslint-disable react-hooks/exhaustive-deps */

import { ReactElement } from "react";
import { About } from "../src/About";
import { ApiClient } from "../src/ApiClient";

const AboutPage = (): ReactElement => {
  return <About client={ApiClient()} />;
};

export default AboutPage;
