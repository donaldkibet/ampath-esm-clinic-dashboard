import { useBaseEtlUrl } from "../custom-hooks/useBaseEtlUrl";
const CREDENTIALS: string = "auth.credentials";
const etlUrl = useBaseEtlUrl();

export interface FetchResponse<T = any> extends Response {
  data: T;
}

export function amrsFetch<T = any>(
  url: string,
  options?: RequestInit | null
): Promise<FetchResponse<T>> {
  const headers = {
    "Content-Type": "Application/json",
    Authorization: `Basic ${sessionStorage.getItem(CREDENTIALS)}`,
  };
  const fetchUrl = etlUrl.concat(url);
  return window
    .fetch(fetchUrl, { headers: { ...headers }, ...options })
    .then(r => {
      const response = r as FetchResponse<T>;
      if (response.ok) {
        if (response.status === 204) {
          response.data = (null as unknown) as T;
          return response;
        } else {
          return response.json().then(data => {
            response.data = data;
            return response;
          })
        }
      } else {
        return response.text().then(responseText => {
          let responseBody = responseText;
          try{
            responseBody = JSON.parse(responseText);
            throw new Error(responseBody);
          } catch(err) {
            throw new Error(err);
          }
        })
      }
    })
}
