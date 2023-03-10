/// <reference types="cypress" />
import { forEach } from "lodash";
import apps from "../../apps.json";
import { isHTMLApp } from "../../utils";

//const htmlApps = filter(apps, isHTMLApp);

describe("US Geo Redirect - 302", () => {
  forEach(apps, (app) => {
    const baseUrl = `https://main.${app.id}.amplifyapp.com`;
    const sourcePath = isHTMLApp(app) ? "/documents/geo-redirect.html" : "/a";
    const destinationPath = isHTMLApp(app)
      ? "documents/us/geo-redirect.html"
      : "/b";
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
