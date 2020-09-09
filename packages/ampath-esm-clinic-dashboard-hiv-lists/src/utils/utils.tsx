export const pocUrl: string = "https://ngx.ampath.or.ke";
export const CREDENTIALS: string = "auth.credentials";
export const etlBaseUrl = `https://ngx.ampath.or.ke/etl-server-test-worcester/etl/`;
export const LocationUuid: string = "location_uuid";

export function handleMessage(event: MessageEvent) {
  if (event.origin === pocUrl && event.data.loginToken) {
    window.sessionStorage.setItem(CREDENTIALS, event.data.loginToken);
  } else if (event.origin === pocUrl && event.data?.location_uuid) {
    window.sessionStorage.setItem(LocationUuid, event.data?.location_uuid);
  }
}

export function sendMessage(message: any) {
  window.parent.postMessage(message, pocUrl);
}

export function getColumns(sectionDefinitions: Array<any>, result: Array<any>) {
  if (sectionDefinitions && result) {
    let headers = [];
    let defs = [];
    let sumOfValue = [];
    let locations = [];
    for (let i = 0; i < sectionDefinitions.length; i++) {
      const section = sectionDefinitions[i];
      const created: any = {};
      created.headerName = section.sectionTitle;
      const header = {
        label: section.sectionTitle,
        value: i,
      };
      headers.push(header);
      created.children = [];
      for (let j = 0; j < section.indicators.length; j++) {
        const indicatorDefinition = section.indicators[j].indicator;
        const child: any = {
          headerName: section.indicators[j].label,
          field: section.indicators[j].indicator,
          description: section.indicators[j].description,
          value: [],
          width: 360,
          total: 0,
        };
        result.forEach((element) => {
          const val: any = {
            location: element["location_uuid"],
            value: "-",
          };
          if (
            element[indicatorDefinition] ||
            element[indicatorDefinition] === 0
          ) {
            val.value = element[indicatorDefinition];
            sumOfValue.push(val.value);
            locations.push(element["location_uuid"]);
          }

          child.value.push(val);
        });
        created.children.push(child);
      }
      defs.push(created);
    }
    return defs;
  }
  return [];
}


export const getLocationUuid = () => {
  if (window.sessionStorage.getItem(LocationUuid)) {
    return window.sessionStorage.getItem(LocationUuid);
  } else {
    sendMessage({ action: "getLocationUuid" });
    return window.sessionStorage.getItem(LocationUuid);
  }
};
