import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Step2 from "./Step2";

describe("Step2", () => {
  const handleSubmitData = jest.fn();

  it("should render the component without errors", () => {
    const { getByText } = render(<Step2 handleSubmitData={handleSubmitData} />);
    expect(getByText("DISIRED INTERNSHIP PERIOD")).toBeInTheDocument();
  });

  it("should set the period value when user enters a valid number", () => {
    const { getByRole } = render(<Step2 handleSubmitData={handleSubmitData} />);
    const periodInput = getByRole("textbox") as HTMLInputElement;
    fireEvent.change(periodInput, { target: { value: "100" } });
    expect(periodInput.value).toBe("100");
  });

  it("should not set the period value when user enters an invalid number", () => {
    const { getByRole } = render(<Step2 handleSubmitData={handleSubmitData} />);
    const periodInput = getByRole("textbox") as HTMLInputElement;
    fireEvent.change(periodInput, { target: { value: "50" } });
    expect(periodInput.value).toBe("");
  });

  it("should call handleSubmitData when submit button is clicked", () => {
    const { getByText } = render(<Step2 handleSubmitData={handleSubmitData} />);
    const submitButton = getByText("Submit");
    fireEvent.click(submitButton);
    expect(handleSubmitData).toHaveBeenCalled();
  });
});
