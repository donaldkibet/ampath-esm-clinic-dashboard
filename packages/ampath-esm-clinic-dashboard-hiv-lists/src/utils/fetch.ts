import { CREDENTIALS } from "./utils";

export function amrsFetch(url: RequestInfo, options?: RequestInit | null) {
  const headers = {
    "Content-Type": "Application/json",
    Authorization: `Basic ${sessionStorage.getItem(CREDENTIALS)}`,
  };
  return window
    .fetch(url, {
      headers: {
        ...headers,
      },
      ...options
    })
    .then((resp) => resp.json())
    .then((resp) => resp);
}
