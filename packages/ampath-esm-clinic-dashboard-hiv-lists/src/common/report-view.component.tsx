import React, { Fragment } from "react";
import { EtlReportData } from "../types/types";
import styles from "./report-view.css";

const ReportView: React.FC<EtlReportData> = ({
  indicatorDefinitions,
  result,
  queriesAndSchemas,
  sectionDefinitions,
}) => {
  const [reportData, setReportData] = React.useState<Array<any>>();

  React.useEffect(() => {
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
      setReportData(defs);
    }
  }, []);

  return (
    <div className={styles.reportViewContainer}>
      <table>
        {reportData &&
          reportData.map((data, index) => (
            <tbody key={index}>
              <tr>
                <td className={styles.reportTableHeader} colSpan={2}>{data.headerName}</td>
              </tr>
              {data.children.map((child, index) => (
                <tr key={index}>
                  <td>{child.headerName}</td>
                  <td>{child.value[0].value}</td>
                </tr>
              ))}
            </tbody>
          ))}
      </table>
    </div>
  );
};

export default ReportView;
