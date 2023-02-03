const fs = require("fs");
const lodash = require("lodash");
const path = require("path");
//const { fileURLToPath } = require("url");
const apps = require("./apps.json");
const CDKOutput = require("./infra/hostingGatewayAppsCDK/cdk-outputs.json");
//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);

const { find, forEach } = lodash;
let appsWithIds = [];

forEach(CDKOutput["HostingGatewayAppsCdkStack"], function (app) {
  const [name, id] = app.split("|");
  console.log(name, id);

  const appRecord = find(apps, (a) => a.name === name);
  // @ts-ignore
  appRecord["id"] = id;
  appsWithIds.push(appRecord);
  console.log(appsWithIds);
});

fs.writeFileSync(
  path.join(__dirname, "appsWithIds.json"),
  JSON.stringify(appsWithIds, null, 2)
);
