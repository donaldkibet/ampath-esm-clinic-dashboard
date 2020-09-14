const locationUuidKey = "location_uuid";

export function useCurrentLocation() {
  return window.localStorage.getItem(locationUuidKey);
}
