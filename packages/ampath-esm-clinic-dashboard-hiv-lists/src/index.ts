import "./set-public-path";
import { backendDependencies } from "./openmrs-backend-dependencies";

const importTranslation = require.context(
  "../translations",
  false,
  /.json$/,
  "lazy"
);

function setupOpenMRS() {
  return {
    lifecycle: () => import("./spa-package"),
    activate: "home",
  };
}

export { backendDependencies, importTranslation, setupOpenMRS };
