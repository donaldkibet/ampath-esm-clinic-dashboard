import React from "react";
import ReportView from "./report-view.component";
import { EtlReportData } from "../types/types";
import { render, screen, fireEvent } from "@testing-library/react";
import { OVCMockReportData } from "../../__mocks__/ovc-report-data.mock";

const mockUseHistory = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockUseHistory,
  }),
}));

describe("<ReportView/>", () => {
  const mockETLResults: EtlReportData = OVCMockReportData;

  beforeEach(() => {
    render(
      <ReportView
        indicatorDefinitions={mockETLResults.indicatorDefinitions}
        sectionDefinitions={mockETLResults.sectionDefinitions}
        result={mockETLResults.result}
        queriesAndSchemas={mockETLResults.queriesAndSchemas}
        params=""
      />
    );
  });

  it("should render report view correctly", () => {
    expect(screen.getByText(/Location Test/i).textContent).toEqual(
      "Location Test"
    );
    expect(screen.getByText(/OVC in HIV/i).textContent).toEqual("OVC in Hiv");
    expect(
      screen.getByText(/Active in Care and Eligible for OVC/i).textContent
    ).toEqual("Active in Care and Eligible for OVC");
  });

  it("should redirect to ovc patient list on indicator clicked", () => {
    const activeInCareIndicator = screen.getByText(
      /Active in Care and Eligible for OVC/i
    );
    fireEvent.click(activeInCareIndicator);
    expect(mockUseHistory).toHaveBeenCalled();
  });
});
