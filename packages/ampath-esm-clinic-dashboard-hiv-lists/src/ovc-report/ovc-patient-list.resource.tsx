import { amrsFetch } from "../utils/fetch";
import { etlBaseUrl } from "../utils/utils";

export function fetchOVCPatientList(
  locationUuids: string,
  endDate: string,
  indicators: string,
  abortController: AbortController
) {
  return amrsFetch(
    `${etlBaseUrl}ovc-monthly-summary-patient-list?locationUuids=${locationUuids}&endDate=${endDate}&indicators=${indicators}`,
    {
      signal: abortController.signal,
    }
  );
}

export function fetchOVCReport(
  abortController: AbortController,
  locationUuids: string,
  endDate: string
) {
  return amrsFetch(
    `${etlBaseUrl}ovc-monthly-summary?endDate=${endDate}&locationUuids=${locationUuids}`,
    { signal: abortController.signal }
  );
}
