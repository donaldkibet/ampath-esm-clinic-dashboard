import { amrsFetch } from "../../amrs-fetch/amrsFetch";

export function fetchCrossBorderPatientList(
  locationUuids: string,
  startDate: string,
  endDate: string,
  indicator: string,
  abortController: AbortController
) {
  return amrsFetch(
    `/MOH-731-report/patient-list?startIndex=0&endDate=${endDate}&startDate=${startDate}&reportName=MOH-731-report-2017&indicator=${indicator}&locationUuids=${locationUuids}&limit=300`,
    {
      signal: abortController.signal,
    }
  );
}

export function fetchCrossBorderReportData(
  abortController: AbortController,
  locationUuids: string,
  endDate: string,
  startDate: string
) {
  return amrsFetch(
    `/MOH-731-report?locationUuids=${locationUuids}&startDate=${startDate}&endDate=${endDate}&reportName=MOH-731-report-2017&isAggregated=false&exclude=moh731`,
    { signal: abortController.signal }
  );
}
