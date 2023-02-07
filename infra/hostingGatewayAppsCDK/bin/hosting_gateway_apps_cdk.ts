#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import "source-map-support/register";
import { HostingGatewayAppsCdkStack } from "../lib/hosting_gateway_apps_cdk-stack";

const regions = process.env.HGW_APP_REGIONS;
const app = new cdk.App();

regions?.split("|").forEach((region) => {
  new HostingGatewayAppsCdkStack(app, `HostingGatewayAppsCdkStack-${region}`, {
    env: { region },
  });
});
