import { amrsFetch, FetchResponse } from "../../amrs-fetch/amrsFetch";
import { EtlReportData } from "../../types/types";

export function fetchOVCPatientList(
  locationUuids: string,
  endDate: string,
  indicators: string,
  abortController: AbortController
) {
  return amrsFetch(
    `/ovc-monthly-summary-patient-list?locationUuids=${locationUuids}&endDate=${endDate}&indicators=${indicators}`,
    {
      signal: abortController.signal,
    }
  );
}

export function fetchOVCReport(
  abortController: AbortController,
  locationUuids: string,
  endDate: Date
): Promise<FetchResponse<EtlReportData>> {
  return amrsFetch(
    `/ovc-monthly-summary?endDate=${endDate}&locationUuids=${locationUuids}`,
    { signal: abortController.signal }
  );
}
