import React from "react";
import ReportTitle from "../../ui-components/header-ui/report-title.component";
import ReportFilter from "../../ui-components/report-filter.component";
import ReportView from "../../ui-components/report-view.component";
import { EtlReportData } from "../../types/types";
import styles from "./cross-border-report.component.css";
import { fetchCrossBorderReportData } from "./cross-border.resource";
import { useHistory, useLocation } from "react-router-dom";
import { useCurrentLocation } from "../../custom-hooks/useCurrentLocation";
import moment from "moment";

const CrossBorderReport: React.FC = () => {
  const currentLocation = useCurrentLocation();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [month, setMonth] = React.useState<Date>();
  const [loadReport, setLoadReport] = React.useState<boolean>();
  const [crossBorderReportData, setCrossBorderReportData] = React.useState<
    EtlReportData
  >();
  const [showError, setShowError] = React.useState<boolean>(false);
  const [locationUuid, setLocationUuid] = React.useState(currentLocation);

  const history = useHistory();
  const location = useLocation<{
    month: Date;
    locationUuid: string;
  }>();

  const handleLocationChange = (event: MessageEvent) => {
    event.data?.location_uuid && setLocationUuid(event.data.location_uuid);
  };

  React.useEffect(() => {
    window.addEventListener("message", handleLocationChange);
    return () => window.removeEventListener("message", handleLocationChange);
  }, []);

  React.useEffect(() => {
    if (month) {
      setLoading(true);
      const ac = new AbortController();
      const startDate = moment(month).startOf("month").format("YYYY-MM-DD");
      const endDate = moment(month).endOf("month").format("YYYY-MM-DD");
      fetchCrossBorderReportData(ac, locationUuid, endDate, startDate).then(
        ({ data }) => {
          setCrossBorderReportData(data);
          setLoading(false);
        },
        (error) => {
          setShowError(true);
          setLoading(false);
        }
      );
      return () => ac.abort();
    }
  }, [loadReport, locationUuid]);

  React.useEffect(() => {
    if (location?.state) {
      let { month, locationUuid } = location.state;
      if (month && locationUuid) {
        setCrossBorderReportData(null);
        setMonth(month);
        setLoadReport(!loadReport);
      }
    }
  }, []);

  const generateReport = (): void => {
    month ?? setMonth(new Date());
    setLoadReport(!loadReport);
    storeInURL();
  };

  const storeInURL = (): void => {
    const params = {
      month: month ?? new Date(),
      locationUuid: locationUuid,
    };
    history.push(`/home/cross-border-report`, params);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMonth(event.target.valueAsDate);
  };

  return (
    <>
      {!loading ? (
        <div>
          {showError && (
            <div className={styles.error}>
              <div>
                <svg className="omrs-icon" fill="var(--omrs-color-danger)">
                  <use xlinkHref="#omrs-icon-important-notification"></use>
                </svg>
                <h3>An error occurred while loading the report</h3>
              </div>
              <svg className="omrs-icon" fill="var(--omrs-color-danger)" onClick={() => setShowError(false)}>
                <use xlinkHref="#omrs-icon-close"></use>
              </svg>
            </div>
          )}
          <ReportTitle title="Cross Border Report" />
          <ReportFilter>
            <div className={styles["report-filters"]}>
              <div className={styles.inputContainer}>
                <label htmlFor="startDate">Start Date</label>
                <input
                  type="month"
                  name="startDate"
                  id="startDate"
                  onChange={handleChange}
                  value={moment(month).format("YYYY-MM")}
                />
              </div>
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
          {crossBorderReportData && (
            <ReportView
              indicatorDefinitions={crossBorderReportData.indicatorDefinitions}
              sectionDefinitions={crossBorderReportData.sectionDefinitions}
              result={crossBorderReportData.result}
              queriesAndSchemas={crossBorderReportData.queriesAndSchemas}
              params={{
                patientListUrl: `/home/cross-border-patient-list/${locationUuid}/${
                  month ?? new Date()
                }`,
              }}
            />
          )}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default CrossBorderReport;
