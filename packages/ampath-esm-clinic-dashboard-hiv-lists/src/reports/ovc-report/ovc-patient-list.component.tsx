import React from "react";
import PatientList from "../../patient-list/patient-list.component";
import { fetchOVCPatientList } from "./ovc-patient-list.resource";
import { colDef } from "../../types";
import { useHistory } from "react-router-dom";

function OVCPatientList(props) {
  const [ovcReportData, setOvcReportData] = React.useState<Array<any>>();
  const {
    endDate,
    indicators,
    locationUuids,
    indicatorName,
  } = props.match.params;
  let history = useHistory();
  React.useEffect(() => {
    const ac = new AbortController();
    fetchOVCPatientList(locationUuids, endDate, indicators, ac).then(
      ({ data }) => setOvcReportData(data.result),
      (erro) => {
        console.error(erro);
      }
    );
  }, [indicators, endDate]);
  return (
    <div>
      <div>
        {ovcReportData && (
          <button
            style={{ marginLeft: "0.625rem", cursor: "pointer" }}
            className="omrs-btn omrs-filled-action"
            onClick={() => history.goBack()}
          >
            Back
          </button>
        )}
      </div>
      {ovcReportData && (
        <PatientList
          columnsDef={columnsDef}
          rowData={ovcReportData}
          indicator={indicators}
          indicatorName={indicatorName}
        />
      )}
    </div>
  );
}

export default OVCPatientList;

const columnsDef: Array<colDef> = [
  {
    headerName: "Identifiers",
    field: "identifiers",
    cellRender: (value) => (
      <a href="#" title="providercount">
        {value}
      </a>
    ),
  },
  {
    headerName: "Name",
    field: "person_name",
  },
  {
    headerName: "Enrollment date",
    field: "enrollment_date",
  },
  {
    headerName: "Age",
    field: "age",
  },
  {
    headerName: "OVC ID",
    field: "ovc_identifier",
  },
  {
    headerName: "Latest VL",
    field: "vl_1",
  },
  {
    headerName: "Latest vl date",
    field: "vl_1_date",
  },
  {
    headerName: "County",
    field: "county",
  },
  {
    headerName: "Sub County",
    field: "sub_county",
  },
  {
    headerName: "Location",
    field: "location",
  },
  {
    headerName: "Ward",
    field: "ward",
  },
  {
    headerName: "last clinic date",
    field: "last_appointment",
  },
  {
    headerName: "Latest RTC",
    field: "latest_rtc_date",
  },
  {
    headerName: "Current regimen",
    field: "cur_arv_meds",
  },
  {
    headerName: "Disclosure",
    field: "disclosure_status",
  },
  {
    headerName: "Due for Vl",
    field: "due_for_vl_this_month",
  },
  {
    headerName: "Status",
    field: "status",
  },
];
