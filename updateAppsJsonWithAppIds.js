//const fs = require("fs");
const lodash = require("lodash/fp");
//const path = require("path");
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

// mapValues(CDKOutput, function (stack) {
//   //console.log(stack);
//   mapValues(stack, function (app) {
//     const [name, id] = app.split("|");
//     console.log(app);
//     appsWithIds[name] = id;
//   });
// });

// console.log(appsWithIds);

// each(CDKOutput, function (stack) {
//   //console.log("stack", stack);
//   forEach(stack, function (app) {
//     const [name, id] = app.split("|");
//     console.log(name, id);

//     appsWithIds[name].push(id);
//     //const appRecord = find(apps, (a) => a.name === name);
//     // @ts-ignore
//     //appRecord["id"] = id;
//     //appsWithIds.push(appRecord);
//     //console.log(appsWithIds);
//   });
// });
// console.log(appsWithIds);

// fs.writeFileSync(
//   path.join(__dirname, "apps.json"),
//   JSON.stringify(appsWithIds, null, 2)
// );
