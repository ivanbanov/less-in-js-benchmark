import fs from "fs";
import path from "path";

const directoryPath = "./src/components";

const boxTemplate = (i) => `
import React from 'react'
import styles from './styles-${i}.less'

export const Box${i} = () => (
  <div className={styles.box}>
    <div className={styles.nested}>Box ${i}</div>
  </div>
);
`;

let benchmarkTemplate = `
import React from 'react'
// import { Box#i } from './components/box-#i'

export const Benchmark = () => (
  <>
    {/* <Box#i /> */}
  </>
)
`;

const lessStyles = `
@info: blue;
@error: red;

.dark() {
  background: black;
}

.box {
  color: @info;
  &.nested {
    .dark();
    color: @error;
  }
}
`.trim();

if (fs.existsSync(directoryPath)) {
  fs.rmSync(directoryPath, { recursive: true });
}

fs.mkdirSync(directoryPath);

for (let i = 1; i <= 2; i++) {
  fs.writeFileSync(
    path.join(directoryPath, `box-${i}.tsx`),
    boxTemplate(i).trim(),
  );

  fs.writeFileSync(path.join(directoryPath, `styles-${i}.less`), lessStyles);

  benchmarkTemplate = benchmarkTemplate
    .replace(/(\s+)(\{\/\*\s)(.*?)(#i)(.*>).*/, `$&$1$3${i}$5`)
    .replace(/(\/\/\s)(.*?)(#i)(.*)(#i)(.*)/, `$&\n$2${i}$4${i}$6`);
}

fs.writeFileSync("./src/benchmark.tsx", benchmarkTemplate.trim());
