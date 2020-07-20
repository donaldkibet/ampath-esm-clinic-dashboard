import React from "react";
import { amrsFetch } from "../utils/fetch";
import { EtlReportData } from "../types/types";
import styles from "./ovc-report.css";
import ReportFilter from "../common/report-filter.component";
import { etlBaseUrl } from "../utils/utils";
import ReportView from "../common/report-view.component";

const OVCReport: React.FC = () => {
  const [ovcReportData, setOvcReportData] = React.useState<EtlReportData>();
  const [endDate, setEndDate] = React.useState<string>();
  const [loadReport, setLoadReport] = React.useState(false);
  console.log(endDate);
  React.useEffect(() => {
    if (endDate) {
      amrsFetch(
        `${etlBaseUrl}/ovc-monthly-summary?endDate=${endDate}&locationUuids=08feae7c-1352-11df-a1f1-0026b934883`
      ).then((response) => setOvcReportData(response));
    }
  }, [loadReport]);

  return (
    <div>
      <h4 className={styles.header}>
        <span>
          <svg className="omrs-icon">
            <use xlinkHref="#omrs-icon-access-time"></use>
          </svg>
        </span>
        OVC Report
      </h4>
      <ReportFilter onInputChange={setEndDate} />
      <div className={styles.reportButton}>
        <button
          className="omrs-btn omrs-filled-action"
          onClick={() => {
            setOvcReportData(null);
            setLoadReport(!loadReport);
          }}
        >
          Generate Report
        </button>
      </div>

      {ovcReportData && (
        <ReportView
          indicatorDefinitions={ovcReportData.indicatorDefinitions}
          sectionDefinitions={ovcReportData.sectionDefinitions}
          result={ovcReportData.result}
          queriesAndSchemas={ovcReportData.queriesAndSchemas}
        />
      )}
    </div>
  );
};

export default OVCReport;
