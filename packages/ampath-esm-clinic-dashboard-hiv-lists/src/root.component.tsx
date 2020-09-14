import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { defineConfigSchema } from "@openmrs/esm-module-config";
import openmrsRootDecorator from "@openmrs/react-root-decorator";
import { HIVListsRoutes } from "./routes/hiv-lists.routes";
import { useMessageEventHandler } from "./custom-hooks/useMessageEventHandler";

const moduleName = "@ampath/esm-clinic-dashboard-hiv-lists-app";

defineConfigSchema(moduleName, {});

const Root: React.FC = () => {
  const { sendMessage, handleMessage } = useMessageEventHandler();
  React.useEffect(() => {
    sendMessage("login");
  }, []);

  React.useEffect(() => {
    window.addEventListener("message", handleMessage.bind(this));
  }, []);

  return (
    <BrowserRouter basename={window["getOpenmrsSpaBase"]()}>
      {HIVListsRoutes.map((hivroute) => (
        <Route
          key={hivroute.name}
          exact
          path={hivroute.path}
          render={(routeProps) => {
            return <hivroute.component {...routeProps} />;
          }}
        />
      ))}
    </BrowserRouter>
  );
};

export default openmrsRootDecorator({
  featureName: "hiv-lists",
  moduleName,
})(Root);
