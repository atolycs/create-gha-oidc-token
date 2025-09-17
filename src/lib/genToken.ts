import {
  error,
  getIDToken,
  info,
  saveState,
  setFailed,
  setOutput,
  setSecret,
} from "@actions/core";

import { HttpClient } from "@actions/http-client";

export async function assumeRole(params: GetTokenParams) {
  const GITHUB_API_URL =
    process.env["GITHUB_API_URL"] || "https://api.github.com";

  const payload: TokenPayload = {
    api_url: GITHUB_API_URL,
    repositories: params.repositories,
  };

  const payload_headers: RequestHeader = {};

  if (!isIdTokenAvailable()) {
    error(`
      OIDC Provider is not available.
      Please enable it.
      https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect
    `);
  }
  info(`====> Fetching OIDC Token... 🔑`);
  // debug(`Fetch ACTIONS_ID_TOKEN_REQUEST_URL`)
  // const response = await fetch(process.env["ACTIONS_ID_TOKEN_REQUEST_URL"], {
  //   headers: new Headers({
  //     Authorization: `Bearer ${process.env["ACTIONS_ID_TOKEN_REQUEST_TOKEN"]}`
  //   })
  // })

  const token = await getIDToken(params.audience);

  payload_headers["Authorization"] = `Bearer ${token}`;

  const client = new HttpClient("github-app-token");

  info(`====> Ringing OIDC Provider...  🤙`);
  try {
    const respToken = await client.postJson<ResponseHeader>(
      params.providerEndpoint,
      payload,
      payload_headers,
    );

    info(`====> OIDC Token get. See you Provider Endpoint ☎️`);
    info(`====> Configuration Secrets...`);

    setSecret(String(respToken.result?.token));
    setOutput("token", respToken.result?.token);
    setOutput("commitemail", respToken.result?.github_commitEmail);
    setOutput("app_slug", respToken.result?.github_username);
    saveState("token", respToken.result?.token);
  } catch (err) {
    setFailed(`${err}`);
  }
}

const isIdTokenAvailable = (): boolean => {
  const token = process.env["ACTIONS_ID_TOKEN_REQUEST_TOKEN"];
  const url = process.env["ACTIONS_ID_TOKEN_REQUEST_URL"];

  return token && url ? true : false;
};
