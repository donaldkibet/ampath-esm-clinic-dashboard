import React, { Fragment } from "react";
import { EtlReportData } from "../types/types";
import styles from "./report-view.css";
import { useHistory } from "react-router-dom";
import { getColumns } from "../utils/utils";

const ReportView: React.FC<EtlReportData> = ({
  result,
  sectionDefinitions,
  params,
}) => {
  const [columnDefs, setColumnDefs] = React.useState<Array<any>>();
  let history = useHistory();

  React.useEffect(() => {
    setColumnDefs(getColumns(sectionDefinitions, result));
  }, []);

  const navigateToPatientList = (indicators) => {
    const { endDate, locationUuids } = params;
    history.push(
      `/home/list/${endDate}/${indicators.field}/${locationUuids}/${indicators.indicatorName}`
    );
  };

  return (
    <div className={styles.reportViewContainer}>
      <table>
        {columnDefs &&
          columnDefs.map((data, index) => (
            <tbody key={index}>
              <tr>
                <td className={styles.reportTableHeader} colSpan={2}>
                  {data.headerName}
                </td>
              </tr>
              {data.children.map((child, index) => {
                return (
                  <tr
                    tabIndex={1}
                    onClick={() =>
                      navigateToPatientList({
                        field: child.field,
                        value: child.value[0].value,
                        indicatorName: child.headerName,
                      })
                    }
                    key={index}
                    className={styles.indicator}
                  >
                    <td>{child.headerName}</td>
                    <td>{child?.value[0] ? child?.value[0].value : " - "}</td>
                  </tr>
                );
              })}
            </tbody>
          ))}
      </table>
    </div>
  );
};

export default ReportView;
