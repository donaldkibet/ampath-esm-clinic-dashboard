import React from "react";
import ReportFilter from "../common/report-filter.component";
import ReportView from "../common/report-view.component";
import { EtlReportData } from "../types/types";
import { fetchOVCReport } from "./ovc-patient-list.resource";
import styles from "./ovc-report.css";
import { sendMessage, getLocationUuid } from "../utils/utils";
import moment from "moment";

const OVCReport: React.FC = () => {
  const [ovcReportData, setOvcReportData] = React.useState<EtlReportData>();
  const [endDate, setEndDate] = React.useState<string>();
  const [loadReport, setLoadReport] = React.useState(false);
  const [locationUuids, setLocationUuids] = React.useState("");
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    const ac = new AbortController();
    if (endDate && locationUuids) {
       setLoading(true);
      fetchOVCReport(ac, locationUuids, endDate).then((resp) => {
        setLoading(false);
        setOvcReportData(resp);
      });
    }
  }, [loadReport]);

  React.useEffect(() => {
    if (endDate && locationUuids) {
      generateReport();
    }
  }, [endDate,locationUuids]);

  React.useEffect(() => {
    setLocationUuids(getLocationUuid());
  }, [getLocationUuid()]);

  React.useEffect(() => {
    sendMessage({
      action: 'loadParamsFromURL'
    });
    window.addEventListener("message", handleMessageURLParams.bind(this));
  }, []);

  const handleMessageURLParams = (params: MessageEvent) => {
    if (params.data.endDate) {
      setEndDate(params.data.endDate);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(moment(event.target.value).endOf("month").format("YYYY-MM-DD"));
  };

  const generateReport = () => {
    setOvcReportData(null);
    setLoadReport(!loadReport);
    sendMessage({
      storeParamsInUrl: {
        params: { endDate: endDate, locationUuid: locationUuids },
      },
      action: 'storeParamsInUrl'
    });
  };

  return (
    <>
      {!loading ? (
        <div>
          <h4 className={styles.header}>
            <span>
              <svg className="omrs-icon">
                <use xlinkHref="#omrs-icon-access-time"></use>
              </svg>
            </span>
            OVC Report
          </h4>
          <ReportFilter>
            <div className={styles.inputContainer}>
              <label htmlFor="endDate">End Date</label>
              <input
                type="month"
                name="endDate"
                id="endDate"
                onChange={handleChange}
                value={moment(endDate).format("YYYY-MM")}
              />
            </div>
          </ReportFilter>
          <div className={styles.reportButton}>
            <button
              className="omrs-btn omrs-filled-action"
              onClick={generateReport}
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
              params={{ endDate: endDate, locationUuids: locationUuids }}
            />
          )}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default OVCReport;
