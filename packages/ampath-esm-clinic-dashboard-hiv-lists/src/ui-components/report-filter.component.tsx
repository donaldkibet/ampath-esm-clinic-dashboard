import React from "react";
import styles from "./report-filter.component.css";

interface ReportFilterProps {
  children: React.ReactNode;
}

const ReportFilter: React.FC<ReportFilterProps> = ({ children }) => {
  const [displayReportFilters, setDisplayReportFilters] = React.useState(true);
  const toggleReportFilters = () => {
    setDisplayReportFilters(!displayReportFilters);
  };
  return (
    <div className={styles["report-filter"]}>
      <div className={styles["report-filter-container"]}>
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
      <div className={displayReportFilters ? "" : styles.hide}>{children}</div>
    </div>
  );
};

export default ReportFilter;
