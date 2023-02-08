#!/bin/bash

if [[ -z "$AWS_ACCOUNT_ID" ]]; then
    echo "Must set AWS_ACCOUNT_ID before running" 1>&2
    exit 1
fi

infraEnvExample="infra/hostingGatewayAppsCDK/.env.example"
infraEnv="infra/hostingGatewayAppsCDK/.env"

echo "Installing AWS CDK and pnpm"
npm install -g aws-cdk pnpm

echo "Installing dependencies"
pnpm install

echo "Set default region for CDK"
export CDK_DEFAULT_REGION=us-east-2

echo "Set app regions"
export HGW_APP_REGIONS="$CDK_DEFAULT_REGION|ca-central-1"

echo "Bootstrapping CDK Environments"
IFS='|' read -ra APPS <<< "$HGW_APP_REGIONS"
for REGION in ${APPS[@]}; do
  cdk bootstrap aws://$AWS_ACCOUNT_ID/$REGION
done

echo "Setup app.json"
if [ ! -f apps.json ]
then
  cp apps.example.json apps.json
fi

echo "Setup $infraEnv"
if [ ! -f $infraEnv ]
then
  cp $infraEnvExample $infraEnv
fi
echo "Done.\n\n"

echo "Update $infraEnv with environment variables"
