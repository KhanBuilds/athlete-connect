const { execSync } = require("child_process");
const port = process.env.PORT || 3000;
console.log(`Starting Next.js on 0.0.0.0:${port}`);
execSync(`npx next start -H 0.0.0.0 -p ${port}`, { stdio: "inherit" });
