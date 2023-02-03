/// <reference types="cypress" />
import { filter, forEach } from "lodash";
import apps from "../../apps.json";
import { isHTMLApp } from "../../utils";

// import { HostingGatewayAppsCdkStack as apps } from "../../infra/hostingGatewayAppsCDK/cdk-outputs.json";
// console.log(apps)

const htmlApps = filter(apps, isHTMLApp);

describe("Basic redirect - 302", () => {
  forEach(htmlApps, (app) => {
    const baseUrl = `https://main.${app.id}.amplifyapp.com`;
    describe(`Basic redirect HTML ${app.name}`, () => {
      const sourceUri = `${baseUrl}/original.html`;
      const destinationUri = `${baseUrl}/destination.html`;
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
