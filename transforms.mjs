import fs from "fs";
import { filter, forEach } from "lodash";
import path from "path";
import { fileURLToPath } from "url";
import apps from "./apps.json";
import { HostingGatewayAppsCdkStack as CDKOutput } from "./infra/hostingGatewayAppsCDK/cdk-outputs.json";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let appsWithIds = [];

forEach(CDKOutput, function (app) {
  const [name, id] = app.split("|");
  console.log(name, id);

  const found = filter(apps, (a) => a.name === name);
  console.log(found);
  console.log("-------------\n");
});

fs.writeFileSync(
  path.join(__dirname, "appsWithIds.json"),
  JSON.stringify(appsWithIds, null, 2)
);
