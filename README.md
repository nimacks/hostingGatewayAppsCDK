# Hosting Gateway CDK Amplify Testing Apps

## Setup

1. Install CDK `npm install -g aws-cdk`
1. Run `cdk bootstrap aws://<AWS-ACCOUNT-ID>/<AWS-REGION>`
1. Install pnpm `npm install -g pnpm`
1. Run `pnpm install`
1. Generate a Github Personal Access Token for use in the next step
1. Update `infra/hostingGatewayAppsCDK/.env` with environment variables

```
GITHUB_TOKEN=<YOUR-GITHUB-TOKEN>
GITHUB_OWNER=<YOUR-GITHUB-USERNAME>
GIT_REPO=hostingGatewayAppsCDK
```

## Deploy Infrastructure

1. Run `pnpm run infra:deploy`
