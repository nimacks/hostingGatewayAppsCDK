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

1. Install CDK `npm install -g aws-cdk`
1. Bootstrap both regions where the stack will be deployed. Run the following commands:
   1. Production `cdk bootstrap aws://<AWS-ACCOUNT-ID>/us-east-1` (AWS Region but `ca-central-1`)
   1. Beta `cdk bootstrap aws://<AWS-ACCOUNT-ID>/ca-central-1` -- Must use this REGION
1. Install pnpm `npm install -g pnpm`
1. Run `pnpm install`
1. Generate a Github Personal Access Token for use in the next step
1. Update `infra/hostingGatewayAppsCDK/.env` with environment variables

```
GITHUB_TOKEN=<YOUR-GITHUB-TOKEN>
GITHUB_OWNER=<YOUR-GITHUB-USERNAME>
GIT_REPO=hostingGatewayAppsCDK
```

1. Copy `apps.example.json` to `apps.json`

## Deploy Infrastructure

1. Run `pnpm run infra:deploy`
