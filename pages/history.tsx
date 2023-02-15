/* eslint-disable react-hooks/exhaustive-deps */

import { ReactElement } from "react";
import { History } from "../src/History";
import { ApiClient } from "../src/ApiClient";

const HistoryPage = (): ReactElement => {
  return <History client={ApiClient()} />;
};

export default HistoryPage;
