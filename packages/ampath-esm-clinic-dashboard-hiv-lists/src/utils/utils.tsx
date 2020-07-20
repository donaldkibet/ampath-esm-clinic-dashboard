export const pocUrl: string = "http://localhost:3000";
export const CREDENTIALS: string = "auth.credentials";
export const etlBaseUrl = `https://ngx.ampath.or.ke/etl-server-test-worcester/etl`;

export function handleMessage(event: MessageEvent) {
  if (event.origin === pocUrl) {
    window.sessionStorage.setItem(CREDENTIALS, event.data.loginToken);
  }
}

export function sendMessage(message: any) {
  window.parent.postMessage(message, pocUrl);
}
