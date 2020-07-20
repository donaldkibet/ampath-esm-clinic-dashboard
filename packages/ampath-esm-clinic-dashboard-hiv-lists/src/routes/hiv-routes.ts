import { FunctionComponent } from "react";
import OVCReport from "../ovc-report/ovc-report.component";
import { Route, Router } from "react-router";

interface hivListsRoutes {
  name: string;
  url: string;
  component: FunctionComponent;
}

export const hivListsRoutes: Array<hivListsRoutes> = [
  { name: "OVC Report", url: "/ovc-report", component: OVCReport },
];
