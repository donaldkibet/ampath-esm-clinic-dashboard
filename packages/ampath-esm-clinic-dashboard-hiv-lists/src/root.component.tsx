import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { defineConfigSchema } from "@openmrs/esm-module-config";
import openmrsRootDecorator from "@openmrs/react-root-decorator";
import { handleMessage, sendMessage } from "./utils/utils";
import OVCReport from "./ovc-report/ovc-report.component";
import OVCPatientList from "./ovc-report/ovc-patient-list.component";

const Home: React.FC = () => <div>Hello World!</div>;

const moduleName = "@ampath/esm-clinic-dashboard-hiv-lists-app";

defineConfigSchema(moduleName, {});

const Root: React.FC = () => {
  React.useEffect(() => {
    sendMessage("login");
  }, []);

  React.useEffect(() => {
    window.addEventListener("message", handleMessage.bind(this));
  }, []);

  return (
    <BrowserRouter basename={window["getOpenmrsSpaBase"]()}>
      <Route exact path="/home" component={OVCReport} />
      <Route
        exact
        path="/home/list/:endDate?/:indicators?/:locationUuids?/:indicatorName?"
        render={(routerProps) => (<OVCPatientList {...routerProps} />)}
      />
    </BrowserRouter>
  );
};

export default openmrsRootDecorator({
  featureName: "hiv-lists",
  moduleName,
})(Root);
