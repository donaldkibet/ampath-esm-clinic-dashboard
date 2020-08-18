import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { defineConfigSchema } from "@openmrs/esm-module-config";
import openmrsRootDecorator from "@openmrs/react-root-decorator";
import Home from "./home.component";

const moduleName = "@ampath/esm-clinic-dashboard-oncology-lists-app";

defineConfigSchema(moduleName, {});

const Root: React.FC = () => (
  <BrowserRouter basename={window["getOpenmrsSpaBase"]()}>
    <Route path="/oncology" component={Home} />
  </BrowserRouter>
);

export default openmrsRootDecorator({
  featureName: "oncology-lists",
  moduleName,
})(Root);
