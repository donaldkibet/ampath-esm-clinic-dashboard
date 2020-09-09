export const OVCMockReportData = {
  sectionDefinitions: [
    {
      sectionTitle: "",
      indicators: [{ label: "Location", indicator: "location" }],
    },
    {
      sectionTitle: "OVC in Hiv",
      indicators: [
        { label: "Active in Care", indicator: "active_in_care_this_month" },
        {
          label: "Active in Care and Eligible for OVC",
          indicator: "active_and_eligible_for_ovc",
        },
        {
          label: "Eligible and Enrolled in OVC",
          indicator: "enrolled_in_ovc_this_month",
        },
        {
          label: "Eligible for OVC and NOT Enrolled",
          indicator: "ovc_non_enrolment_undocumented",
        },
        {
          label: "Declined OVC Enrollment",
          indicator: "ovc_non_enrolment_declined",
        },
        {
          label: "Out of OVC Catchment Area",
          indicator: "ovc_non_enrolment_out_of_catchment_area",
        },
        {
          label: "Newly Exited this month",
          indicator: "newly_exited_from_ovc_this_month",
        },
        {
          label: "Cumulative Exited",
          indicator: "exited_from_ovc_this_month",
        },
      ],
    },
    {
      sectionTitle: "OVC in Hei",
      indicators: [
        {
          label: "Active and Eligible for OVC",
          indicator: "active_and_eligible_for_ovc_hei",
        },
        {
          label: "Enrolled in OVC",
          indicator: "enrolled_in_ovc_this_month_hei",
        },
        {
          label: "Eligible for OVC and NOT Enrolled",
          indicator: "ovc_non_enrolment_undocumented_hei",
        },
        {
          label: "Declined OVC Enrollment",
          indicator: "ovc_non_enrolment_declined_hei",
        },
        {
          label: "Out of Catchment Area",
          indicator: "ovc_non_enrolment_out_of_catchment_area_hei",
        },
        {
          label: "Newly Exited this month",
          indicator: "newly_exited_from_ovc_this_month_hei",
        },
        {
          label: "Cumulative Exited",
          indicator: "exited_from_ovc_this_month_hei",
        },
      ],
    },
  ],
  result: [
    {
      join_location: 1,
      location_uuid: "18c343eb-b353-462a-9139-b16606e6b6c2",
      location: "Location Test",
      gender: "F",
      location_id: 195,
      on_art_this_month: 0,
      active_in_care_this_month: 0,
      active_and_eligible_for_ovc: 1,
      inactive_and_eligible_for_ovc: 0,
      enrolled_in_ovc_this_month: 1,
      ovc_non_enrolment_declined: 1,
      ovc_non_enrolment_out_of_catchment_area: 1,
      ovc_non_enrolment_undocumented: 0,
      newly_exited_from_ovc_this_month: 1,
      exited_from_ovc_this_month: 1,
      active_and_eligible_for_ovc_hei: 0,
      inactive_and_eligible_for_ovc_hei: 1,
      enrolled_in_ovc_this_month_hei: 0,
      ovc_non_enrolment_declined_hei: 0,
      ovc_non_enrolment_out_of_catchment_area_hei: 0,
      ovc_non_enrolment_undocumented_hei: 0,
      newly_exited_from_ovc_this_month_hei: 0,
      exited_from_ovc_this_month_hei: 1,
    },
  ],
  queriesAndSchemas: [],
  indicatorDefinitions: [],
  params: { endDate: "2020-08-08", locationUuids: "1" },
};
