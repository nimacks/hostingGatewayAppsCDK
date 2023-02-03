import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    testUserPassword: process.env.TEST_USER_PASSWORD,
    //appSyncGraphQLEndpoint: awsConfig["aws_appsync_graphqlEndpoint"],
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
