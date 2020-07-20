import React, { RefForwardingComponent } from "react";
import Devtools from "./devtools/devtools.component";
import openmrsRootDecorator from "@openmrs/react-root-decorator";
import { useDevelopmentReact } from "./use-development-react.hook";


const Root: React.FC = (props) => {
    useDevelopmentReact();

  return <Devtools {...props} />;
}

const moduleName = "@ampath/esm-clinic-dashboard-devtools-app";

export default openmrsRootDecorator({
  featureName: "devtools",
  moduleName: "@openmrs/esm-devtools-app",
})(Root);

type RootProps = {};