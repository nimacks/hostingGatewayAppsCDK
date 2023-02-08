const fs = require("fs");
const lodash = require("lodash/fp");
const path = require("path");
const apps = require("./apps.json");
const CDKOutput = require("./infra/hostingGatewayAppsCDK/cdk-outputs.json");

const { identity, map, pipe, tap, flatten, split, reduce } = lodash;
//const debug = tap(console.log);

const appsWithIds = pipe(
  map((a) => map(identity, a)),
  flatten,
  reduce((result, v) => {
    const [name, id] = split("|", v);
    (result[name] || (result[name] = [])).push(id);
    return result;
  }, {})
)(CDKOutput);

console.log(appsWithIds);

const appsJson = map((app) => {
  app["appIds"] = appsWithIds[app.name];
  return app;
}, apps);

console.log(appsJson);

fs.writeFileSync(
  path.join(__dirname, "apps.json"),
  JSON.stringify(appsJson, null, 2)
);
