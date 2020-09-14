import React from "react";
import { render, screen } from "@testing-library/react";
import CrossBorderReport from "./cross-border-report.component";
import { useHistory, useLocation } from "react-router-dom";
import { mockCrossBorderReportData } from "../../../__mocks__/cross-border-data.mock";

const mockUseHistory = useHistory as jest.Mock;
const mockUseLocation = useLocation as jest.Mock;

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: jest.fn(),
  useLocation: jest.fn(),
}));

jest.mock("./cross-border.resource.tsx", () => ({
  fetchCrossBorderReportData: jest.fn(() =>
    Promise.resolve(mockCrossBorderReportData)
  ),
}));

beforeEach(() => {
  render(<CrossBorderReport />);
});

describe("<CrossBorderReport/>", () => {
  it("should render cross border report", async () => {
    expect(await screen.findByText(/Cross Border Report/i)).toBeInTheDocument();
    expect(await screen.findByText(/Start Date/i)).toBeInTheDocument();
    expect(await screen.findByText(/End Date/i)).toBeInTheDocument();
  });
});
