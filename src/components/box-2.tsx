import React from "react";
import styles from "./styles-2.less";

console.log(styles);

export const Box2 = () => (
  <div className={styles.box}>
    <div className={styles.nested}>Box 2</div>
  </div>
);
