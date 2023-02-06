#!/bin/sh

infraEnv="infra/hostingGatewayAppsCDK/.env"

echo "Installing AWS CDK"
npm install -g aws-cdk

echo "Setting Production and Beta regions for CDK"
CDK_DEFAULT_REGION=us-east-2
CDK_BETA_REGION=ca-central-1

echo "Bootstrapping CDK Environments"
cdk bootstrap aws://$AWS_ACCOUNT_ID/$CDK_DEFAULT_REGION
cdk bootstrap aws://$AWS_ACCOUNT_ID/$CDK_BETA_REGION

echo "Installing pnpm"
npm install -g pnpm

echo "Installing dependencies"
pnpm install

echo "Setup app.json"
cp apps.example.json apps.json

echo "Scaffolding $infraEnv"
echo "GITHUB_TOKEN=<YOUR-GITHUB-TOKEN>
GITHUB_OWNER=<YOUR-GITHUB-USERNAME>
GIT_REPO=hostingGatewayAppsCDK" >> $infraEnv

echo "Done.\n\n"

echo "Update `infra/hostingGatewayAppsCDK/.env` with environment variables"
