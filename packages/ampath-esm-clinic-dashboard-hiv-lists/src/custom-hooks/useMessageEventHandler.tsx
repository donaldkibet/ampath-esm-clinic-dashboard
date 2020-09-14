 const pocUrl: string = "https://ngx.ampath.or.ke/";
 const ETL_SERVER_KEY = "appSettings.etlServer";
const CREDENTIALS: string = "auth.credentials";

 function handleMessage(event: MessageEvent) {
  if (event.origin === pocUrl && event.data.loginToken) {
    window.sessionStorage.setItem(CREDENTIALS, event.data.loginToken);
    window.localStorage.setItem(ETL_SERVER_KEY, event.data.baseEtlUrl);
  }
}

 function sendMessage(message: any) {
  window.parent.postMessage(message, pocUrl);
}

export const useMessageEventHandler = () => { return  {sendMessage, handleMessage}} ;

