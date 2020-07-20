import React from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";
import ImportMap from "./import-map.component";
import "@reach/tabs/styles.css";
import styles from "./devtools-popup.styles.css";

export default function DevToolsPopup(props: DevToolsPopupProps) {
  return (
    <div className={styles.popup}>
      <Tabs className={styles.tabs}>
        <TabList className={styles.tabList}>
          <Tab>Import Map</Tab>
        </TabList>
        <TabPanels className={styles.tabPanels}>
          <TabPanel>
            <ImportMap toggleOverridden={props.toggleOverridden} />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <div className={styles.farRight}>
        <button onClick={props.close} className="omrs-unstyled">
          {"\u24e7"}
        </button>
      </div>
    </div>
  );
}

type DevToolsPopupProps = {
  close(): void;
  toggleOverridden(isOverridden: boolean): void;
};