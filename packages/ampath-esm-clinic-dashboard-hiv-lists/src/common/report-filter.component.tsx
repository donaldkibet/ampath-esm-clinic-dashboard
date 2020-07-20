import React from "react";
import styles from "./report-filter.css";

interface ReportFilterProps {
  onInputChange: Function;
}

const ReportFilter: React.FC<ReportFilterProps> = ({ onInputChange }) => {
  const [displayReportFilters, setDisplayReportFilters] = React.useState(true);
  const toggleReportFilters = () => {
    setDisplayReportFilters(!displayReportFilters);
  };
  return (
    <div>
      <div className={styles.reportFilterContainer}>
        <span>
          <svg className="omrs-icon">
            <use xlinkHref="#omrs-icon-visibility"></use>
          </svg>
          Report filters
        </span>
        <span>
          {displayReportFilters ? (
            <svg className="omrs-icon" onClick={toggleReportFilters}>
              <use xlinkHref="#omrs-icon-chevron-up"></use>
            </svg>
          ) : (
            <svg className="omrs-icon" onClick={toggleReportFilters}>
              <use xlinkHref="#omrs-icon-chevron-down"></use>
            </svg>
          )}
        </span>
      </div>
      <div className={displayReportFilters ? "" : styles.hide}>
        <div className={styles.inputContainer}>
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            name="endDate"
            id="endDate"
            onChange={($evt) => onInputChange($evt.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ReportFilter;
