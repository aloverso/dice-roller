import { fireEvent, render, RenderResult } from "@testing-library/react";
import React from "react";
import { App } from "./App";
import { StubClient } from "./test-objects/StubClient";
import { generateRoll } from "./test-objects/factories";
import { act } from "react-dom/test-utils";

describe("<App />", () => {
  let stubClient: StubClient;
  let subject: RenderResult;

  beforeEach(() => {
    stubClient = new StubClient();
    subject = render(<App client={stubClient} />);
  });

  it("rolls every die", () => {
    fireEvent.click(subject.getByAltText("d4"));
    expect(stubClient.capturedDie).toEqual("d4");

    fireEvent.click(subject.getByAltText("d6"));
    expect(stubClient.capturedDie).toEqual("d6");

    fireEvent.click(subject.getByAltText("d8"));
    expect(stubClient.capturedDie).toEqual("d8");

    fireEvent.click(subject.getByAltText("d12"));
    expect(stubClient.capturedDie).toEqual("d12");

    fireEvent.click(subject.getByAltText("d20"));
    expect(stubClient.capturedDie).toEqual("d20");
  });

  it("rolls a selected die and displays the result", () => {
    expect(subject.queryByText("3")).not.toBeInTheDocument();
    fireEvent.click(subject.getByAltText("d4"));
    expect(stubClient.capturedCount).toEqual(1);
    expect(stubClient.capturedDie).toEqual("d4");

    act(() => stubClient.capturedObserver.onSuccess(generateRoll({ total: 3 })));
    expect(subject.queryByText("3")).toBeInTheDocument();
  });

  it("displays a loader while the api is working", () => {
    expect(subject.queryByRole("progressbar")).not.toBeInTheDocument();
    fireEvent.click(subject.getByAltText("d4"));
    expect(subject.queryByRole("progressbar")).toBeInTheDocument();

    act(() => stubClient.capturedObserver.onSuccess(generateRoll({})));
    expect(subject.queryByRole("progressbar")).not.toBeInTheDocument();
  });

  it("increments the count and sends", () => {
    expect(subject.queryByText("1")).toBeInTheDocument();
    fireEvent.click(subject.getByTitle("increment"));
    expect(subject.queryByText("2")).toBeInTheDocument();
    fireEvent.click(subject.getByTitle("increment"));
    expect(subject.queryByText("3")).toBeInTheDocument();
    fireEvent.click(subject.getByTitle("decrement"));
    expect(subject.queryByText("2")).toBeInTheDocument();

    fireEvent.click(subject.getByAltText("d4"));
    expect(stubClient.capturedCount).toEqual(2);
  });

  it("switches grammar for single/many", () => {
    expect(subject.queryByText("dice")).not.toBeInTheDocument();
    expect(subject.queryByText("die")).toBeInTheDocument();
    fireEvent.click(subject.getByTitle("increment"));
    expect(subject.queryByText("die")).not.toBeInTheDocument();
    expect(subject.queryByText("dice")).toBeInTheDocument();
  });

  it("does not decrement below 1", () => {
    fireEvent.click(subject.getByTitle("decrement"));
    expect(subject.queryByText("1")).toBeInTheDocument();
  });

  it("does not increment above 99", () => {
    for (let i = 0; i < 101; i++) {
      fireEvent.click(subject.getByTitle("increment"));
    }
    expect(subject.queryByText("99")).toBeInTheDocument();
  });

  it("displays each individual roll", () => {
    fireEvent.click(subject.getByTitle("increment"));
    fireEvent.click(subject.getByAltText("d20"));

    act(() => stubClient.capturedObserver.onSuccess(generateRoll({ rolls: [13, 17] })));
    expect(subject.queryByText("13 + 17")).toBeInTheDocument();
  });

  it("does not display individual rolls for 1 die", () => {
    fireEvent.click(subject.getByAltText("d20"));

    act(() => stubClient.capturedObserver.onSuccess(generateRoll({ rolls: [13], total: 13 })));
    expect(subject.queryAllByText("13")).toHaveLength(1);
  });
});
