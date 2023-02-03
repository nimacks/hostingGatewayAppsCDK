/// <reference types="cypress" />
import { forEach } from "lodash";
import apps from "../../apps.json";
import { isHTMLApp } from "../../utils";

// import { HostingGatewayAppsCdkStack as apps } from "../../infra/hostingGatewayAppsCDK/cdk-outputs.json";
// console.log(apps)

//const htmlApps = filter(apps, isHTMLApp);

describe("Basic redirect - 302", () => {
  forEach(apps, (app) => {
    const baseUrl = `https://main.${app.id}.amplifyapp.com`;
    const sourcePath = isHTMLApp(app) ? "/original.html" : "/a";
    const destinationPath = isHTMLApp(app) ? "/destination.html" : "/b";
    describe(`Basic redirect ${app.name}`, () => {
      const sourceUri = `${baseUrl}${sourcePath}`;
      const destinationUri = `${baseUrl}${destinationPath}`;
      it(`should redirect ${sourceUri} to ${destinationUri}`, () => {
        cy.visit(sourceUri);
        cy.url().should("contain", destinationUri);
        cy.getBySel("content").should("have.text", "Destination");
      });
      it(`${sourceUri} should return status code 302`, () => {
        cy.request({
          url: sourceUri,
          followRedirect: false, // turn off following redirects
        }).then((resp) => {
          // redirect status code is 302
          expect(resp.status).to.eq(302);
        });
      });
    });
  });
});
