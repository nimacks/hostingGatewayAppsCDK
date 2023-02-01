import * as aws_amplify from "@aws-cdk/aws-amplify-alpha";
import * as cdk from 'aws-cdk-lib';
import { SecretValue } from "aws-cdk-lib";
import * as aws_codebuild from "aws-cdk-lib/aws-codebuild";
import { Construct } from 'constructs';

export class HostingGatewayAppsCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const initials = "TEST"

    const amplifyApp = new aws_amplify.App(this, `${initials}-amplify-app`, {
      sourceCodeProvider: new aws_amplify.GitHubSourceCodeProvider({
        repository: "202301091107-amplify-cli-test-plan-spa-cra",
        oauthToken: SecretValue.secretsManager("kold-github-token"),
        owner: "kevinold",
      }),
      buildSpec: aws_codebuild.BuildSpec.fromObject({
        version: 1,
        frontend: {
          phases: {
            preBuild: {
              commands: [
                "npm ci",
              ],
            },
            build: {
              commands: ["npm run build"],
            },
          },
          artifacts: {
            baseDirectory: "build",
            files: ["**/*"],
          },
        },
      }),
      // @ts-ignore
      platform: "WEB"
    });

    amplifyApp.addBranch("main");

    amplifyApp.addCustomRule(
      aws_amplify.CustomRule.SINGLE_PAGE_APPLICATION_REDIRECT
    );

    //amplifyApp.addEnvironment("REACT_APP_BASE_API_URL", "test"); 
  }
}
