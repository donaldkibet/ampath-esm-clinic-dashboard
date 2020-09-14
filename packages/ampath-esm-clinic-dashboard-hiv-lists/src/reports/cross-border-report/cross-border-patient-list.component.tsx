import moment from "moment";
import React from "react";
import { useHistory } from "react-router-dom";
import PatientList from "../../patient-list/patient-list.component";
import { colDef } from "../../types";
import { fetchCrossBorderPatientList } from "./cross-border.resource";

const CrossBorderPatientList: React.FC = (props: any) => {
  const [crossBorderPatientList, setCrossBorderPatientList] = React.useState<
    Array<any>
  >();
  const {
    month,
    indicators,
    locationUuids,
    indicatorName,
  } = props.match.params;
  let history = useHistory();

  React.useEffect(() => {
    const ac = new AbortController();
    fetchCrossBorderPatientList(
      locationUuids,
      moment(month).startOf("month").format("YYYY-MM-DD"),
      moment(month).endOf("month").format("YYYY-MM-DD"),
      indicators,
      ac
    ).then(({data}) => setCrossBorderPatientList(data.result));
    return () => ac.abort();
  }, [month, locationUuids]);

  return (
    <div>
      <div>
        {crossBorderPatientList && (
          <button
            style={{ marginLeft: "0.625rem", cursor: "pointer" }}
            className="omrs-btn omrs-filled-action"
            onClick={() => history.goBack()}
          >
            Back
          </button>
        )}
      </div>
      {crossBorderPatientList ? (
        <PatientList
          columnsDef={columnsDef}
          rowData={crossBorderPatientList}
          indicator={indicators}
          indicatorName={indicatorName}
        />
      ) : (
        <div>Loading ...</div>
      )}
    </div>
  );
};

export default CrossBorderPatientList;

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
