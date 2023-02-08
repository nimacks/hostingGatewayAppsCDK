import * as aws_amplify from "@aws-cdk/aws-amplify-alpha";
import { RedirectStatus } from "@aws-cdk/aws-amplify-alpha";
import * as cdk from "aws-cdk-lib";
import { CfnOutput, SecretValue } from "aws-cdk-lib";
import * as aws_codebuild from "aws-cdk-lib/aws-codebuild";
import { Construct } from "constructs";
import * as dotenv from "dotenv";
import apps from "../../../apps.json";
// @ts-ignore
import { isHTMLApp, isWebCompute } from "../../../utils.js";

dotenv.config();

// const apps = globSync("../../apps/*/").map(appDir => (
//   appDir.split("/")[3]
// ))
//console.log(apps)

export class HostingGatewayAppsCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    apps.forEach((app) => {
      const appDir = `apps/${app.name}`;
      const amplifyApp = new aws_amplify.App(this, app.name, {
        sourceCodeProvider: new aws_amplify.GitHubSourceCodeProvider({
          repository: process.env.GIT_REPO!,
          oauthToken: SecretValue.unsafePlainText(process.env.GITHUB_TOKEN!),
          owner: process.env.GITHUB_OWNER!,
        }),
        buildSpec: aws_codebuild.BuildSpec.fromObject({
          version: 1,
          applications: [
            {
              frontend: {
                phases: {
                  preBuild: {
                    commands: ["npm install -g pnpm", "pnpm i"],
                  },
                  build: {
                    commands: [
                      `pnpm --filter ${app.name} run build`,
                      "ls -lah",
                    ],
                  },
                },
                artifacts: {
                  baseDirectory: app.distdir,
                  files: ["**/*"],
                },
              },
              appRoot: appDir,
            },
          ],
        }),
        // @ts-ignore
        platform: app.platform,
      });

      amplifyApp.addBranch("main");

      //aws_amplify.CustomRule.SINGLE_PAGE_APPLICATION_REDIRECT
      if (app.spa) {
        amplifyApp.addCustomRule({
          // must prepend slash "/" for SPA Custom Rule to work
          source:
            "/</^[^.]+$|.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|woff2|ttf|map|json|webp)$)([^.]+$)/>",
          status: RedirectStatus.REWRITE,
          target: "/index.html",
        });
        // likely not possible to add additional redirects for a SPA
        // amplifyApp.addCustomRule({
        //   source: "/a",
        //   status: RedirectStatus.TEMPORARY_REDIRECT,
        //   target: "/b",
        // });
      }

      if (isHTMLApp(app) || isWebCompute(app)) {
        // Basic Redirect - 302
        amplifyApp.addCustomRule({
          source: "/original.html",
          status: RedirectStatus.TEMPORARY_REDIRECT,
          target: "/destination.html",
        });

        // US Geo Redirect - 302
        amplifyApp.addCustomRule({
          source: "/documents/<*>",
          status: RedirectStatus.TEMPORARY_REDIRECT,
          target: "/documents/us/<*>",
          condition: "<US>",
        });
      }

      // Enable monorepo support
      amplifyApp.addEnvironment("AMPLIFY_DIFF_DEPLOY", "false");
      amplifyApp.addEnvironment("AMPLIFY_MONOREPO_APP_ROOT", appDir);

      new CfnOutput(this, `${app.name}AmplifyAppId`, {
        value: `${app.name}|${amplifyApp.appId}`,
      });
    });
  }
}
