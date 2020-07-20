import "./set-public-path";

function setupOpenMRS() {
  return {
    lifecycle: () => import("./ampath-esm-devtools"),
    activate: () => !!localStorage.getItem("ampath:devtools"),
  };
}

export { setupOpenMRS };