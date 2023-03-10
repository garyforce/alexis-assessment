import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Step1 from "./Step1";

describe("Step1", () => {
  const handleNext = jest.fn();

  beforeEach(() => {
    handleNext.mockClear();
  });

  it("renders the component", () => {
    const { getByLabelText, getByText } = render(
      <Step1 handleNext={handleNext} />
    );
    expect(getByLabelText("FIRST NAME")).toBeInTheDocument();
    expect(getByLabelText("LAST NAME")).toBeInTheDocument();
    expect(getByLabelText("LOCATION")).toBeInTheDocument();
    expect(getByLabelText("HEADLINE")).toBeInTheDocument();
    expect(getByLabelText("BIO")).toBeInTheDocument();
    expect(getByText("Next")).toBeInTheDocument();
  });

  it("calls handleNext when all fields are filled and Next button is clicked", () => {
    const { getByLabelText, getByText } = render(
      <Step1 handleNext={handleNext} />
    );
    fireEvent.change(getByLabelText("FIRST NAME"), {
      target: { value: "John" },
    });
    fireEvent.change(getByLabelText("LAST NAME"), { target: { value: "Doe" } });
    fireEvent.change(getByLabelText("LOCATION"), {
      target: { value: "LosAngeles" },
    });
    fireEvent.change(getByLabelText("HEADLINE"), {
      target: { value: "Software Engineer" },
    });
    fireEvent.change(getByLabelText("BIO"), {
      target: { value: "I am a software engineer." },
    });
    fireEvent.click(getByText("Next"));
    expect(handleNext).toHaveBeenCalledWith({
      firstName: "John",
      lastName: "Doe",
      location: "LosAngeles",
      headLine: "Software Engineer",
      bio: "I am a software engineer.",
      imageURL: "",
    });
  });

  it("displays an alert if any required fields are left empty", () => {
    const { getByText } = render(<Step1 handleNext={handleNext} />);
    fireEvent.change(getByText("FIRST NAME"), { target: { value: "John" } });
    fireEvent.change(getByText("LAST NAME"), { target: { value: "Doe" } });
    fireEvent.click(getByText("Next"));
    expect(handleNext).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith(
      "Please fill in all required fields."
    );
  });
});

beforeAll(() => {
  window.alert = jest.fn();
});

afterAll(() => {
  (window.alert as jest.Mock).mockRestore();
});
