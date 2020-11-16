/* eslint-disable @typescript-eslint/no-non-null-assertion */

import React from "react";
import { StubClient } from "./test-objects/StubClient";
import { generateRoll } from "./test-objects/factories";
import { act } from "react-dom/test-utils";
import { render, RenderResult, within } from "@testing-library/react";
import { History } from "./History";
import dayjs from "dayjs";

describe("<History />", () => {
  let stubClient: StubClient;
  let subject: RenderResult;

  beforeEach(() => {
    stubClient = new StubClient();
    subject = render(<History client={stubClient} />);
  });

  it("displays fetched roll history on load", () => {
    const roll = generateRoll({ die: "d6", count: 2, total: 3 });
    act(() => stubClient.capturedObserver.onSuccess([roll]));
    expect(subject.getByTestId("roll").textContent).toContain("2d6");
    expect(subject.getByTestId("roll").textContent).toContain("3");
  });

  it("displays the time in 24hr single-digit format", () => {
    const roll1 = generateRoll({ timestamp: dayjs("2018-04-04T16:17").format() });
    const roll2 = generateRoll({ timestamp: dayjs("2018-04-04T05:55").format() });
    act(() => stubClient.capturedObserver.onSuccess([roll1, roll2]));
    expect(subject.getByText("16:17")).toBeInTheDocument();
    expect(subject.getByText("5:55")).toBeInTheDocument();
  });

  it("groups by day", () => {
    const roll1 = generateRoll({
      timestamp: dayjs("2020-11-13T16:17:00.000Z").format(),
      die: "d6",
    });
    const roll2 = generateRoll({
      timestamp: dayjs("2020-11-10T05:55:00.000Z").format(),
      die: "d8",
    });
    act(() => stubClient.capturedObserver.onSuccess([roll1, roll2]));
    expect(
      within(subject.getByText("Fri, Nov 13 2020").parentElement!).getByText("d6", { exact: false })
    ).toBeInTheDocument();
    expect(
      within(subject.getByText("Tue, Nov 10 2020").parentElement!).getByText("d8", { exact: false })
    ).toBeInTheDocument();
  });

  it("sorts days by most recent first", () => {
    const olderRoll = generateRoll({
      timestamp: dayjs("2020-11-10T05:55:00.000Z").format(),
      die: "d8",
    });
    const recentRoll = generateRoll({
      timestamp: dayjs("2020-11-13T16:17:00.000Z").format(),
      die: "d6",
    });
    act(() => stubClient.capturedObserver.onSuccess([olderRoll, recentRoll]));

    const days = subject.getAllByTestId("day");
    expect(days[0].textContent).toContain("Fri, Nov 13 2020");
    expect(days[1].textContent).toContain("Tue, Nov 10 2020");
  });

  it("sorts rolls in a day by most recent first", () => {
    const olderRoll = generateRoll({
      timestamp: dayjs("2020-11-13T05:55:00.000Z").format(),
      die: "d8",
    });
    const recentRoll = generateRoll({
      timestamp: dayjs("2020-11-13T16:17:00.000Z").format(),
      die: "d6",
    });
    act(() => stubClient.capturedObserver.onSuccess([olderRoll, recentRoll]));

    const days = subject.getAllByTestId("roll");
    expect(days[0].textContent).toContain("d6");
    expect(days[1].textContent).toContain("d8");
  });
});
