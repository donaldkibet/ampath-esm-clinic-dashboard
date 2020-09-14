export function useColumns(sectionDefinitions: Array<any>, result: Array<any>) {
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