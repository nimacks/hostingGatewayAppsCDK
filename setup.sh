#!/bin/sh

infraEnv="infra/hostingGatewayAppsCDK/.env"

echo "Installing AWS CDK"
npm install -g aws-cdk

echo "Set default region for CDK"
export CDK_DEFAULT_REGION=us-east-2

echo "Set app regions"
export HGW_APP_REGIONS="$CDK_DEFAULT_REGION|ca-central-1"

echo "Bootstrapping CDK Environments"
IFS=';' read -ra APPS <<< "$HGW_APP_REGIONS"
for REGION in ${[APPS@]}; do
  cdk bootstrap aws://$AWS_ACCOUNT_ID/$REGION
done

echo "Installing pnpm"
npm install -g pnpm

echo "Installing dependencies"
pnpm install

echo "Setup app.json"
if [ ! -f apps.json ]
then
  cp apps.example.json apps.json
fi

echo "Scaffolding $infraEnv"
if [ ! -f $infraEnv ]
then
  echo "GITHUB_TOKEN=<YOUR-GITHUB-TOKEN>
  GITHUB_OWNER=<YOUR-GITHUB-USERNAME>
  GIT_REPO=hostingGatewayAppsCDK" >> $infraEnv
fi
echo "Done.\n\n"

echo "Update `infra/hostingGatewayAppsCDK/.env` with environment variables"
