import * as aws_amplify from "@aws-cdk/aws-amplify-alpha";
import * as cdk from 'aws-cdk-lib';
import { SecretValue } from "aws-cdk-lib";
import * as aws_codebuild from "aws-cdk-lib/aws-codebuild";
import { Construct } from 'constructs';
import * as dotenv from 'dotenv';

dotenv.config()

export class HostingGatewayAppsCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const initials = "TEST"

    const amplifyApp = new aws_amplify.App(this, `${initials}-amplify-app`, {
      sourceCodeProvider: new aws_amplify.GitHubSourceCodeProvider({
        repository: "202302011539-amplify-cra-vanilla",
        oauthToken: SecretValue.unsafePlainText(process.env.GITHUB_TOKEN!),
        //oauthToken: SecretValue.secretsManager("kold-github-token"),
        //oauthToken: SecretValue.secretsManager("arn:aws:secretsmanager:us-east-2:074128318641:secret:kold-github-token-n2cK9Z"),
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
