# Hosting Gateway CDK Amplify Testing Apps

This repo houses IaC using the CDK to deploy Amplify applications to multiple regions for testing. Cypress tests can be run locally to validate functionality of the applications deployed.

## Apps

Located under `/apps`:

- SSG / SSR - create-next-app (hgw-tests-cna)
- SPA - create-react-app (hgw-tests-cra)
- HTML / SSG - astro (hgw-tests-html)

## Infrastructure as Code

Located under `infra/hostingGatewayAppsCDK`. CDK to deploy `/apps` to Amplify Hosting.

## End-to-end Tests with Cypress

Located under `/cypress`. End to end tests to verify the applications deployed to Amplify Hosting work as expected.

## Setup

Run `./setup.sh` to perform these tasks or follow the steps below:

1. Install CDK and pnpm `npm install -g aws-cdk pnpm`
1. Install dependencies `pnpm install`
1. Set default region for CDK `export CDK_DEFAULT_REGION=us-east-2`
1. Define the deployment regions for this stack `export HGW_APP_REGIONS="$CDK_DEFAULT_REGION|ca-central-1"` Regions separated by pipe (|) - This stack will be deployed to ALL regions defined
1. Bootstrap regions where the stack will be deployed. Run the following command:
   `cdk bootstrap aws://<AWS-ACCOUNT-ID>/<AWS-REGION>`
1. Copy `apps.example.json` to `apps.json`
1. Copy `infra/hostingGatewayAppsCDK/.env.example` to `.env`

## Configuration

1. Generate a Github Personal Access Token for use in the next step
1. Update `infra/hostingGatewayAppsCDK/.env` with environment variables

```
GITHUB_TOKEN=<YOUR-GITHUB-TOKEN>
GITHUB_OWNER=<YOUR-GITHUB-USERNAME>
GIT_REPO=hostingGatewayAppsCDK
```

## Deploy Infrastructure

1. Run `pnpm run infra:deploy`

## Destroy Infrastructure

1. Run `pnpm run infra:destroy`
