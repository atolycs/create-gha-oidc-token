import { debug, error, getInput, info, setFailed } from "@actions/core";
import { assumeRole } from "./lib/genToken";

async function run() {
  const defaultProviderEndpoint = "http://localhost:8080";
  const defaultAppID = "Iv23liy57PugW0TtVnma";
  const audiencePrefix = "https://github-oidc.example.com/";

  try {
    const providerEndpoint =
      getInput("provider-endpoint") || defaultProviderEndpoint;
    const appId = getInput("app-id") || defaultAppID;
    const audience = audiencePrefix + appId;
    const repositories = parseRepository(getInput("repositories"));

    debug("=== DEBUG INFOMATION ===");
    debug(`providerEndpoint: ${providerEndpoint}`);
    debug(`appID: ${appId}`);
    debug(`audience: ${audience}`);
    debug(`repositories: ${repositories}`);

    info(`==> Call to OIDC Provider... 💤`);
    assumeRole({
      providerEndpoint,
      audience,
      repositories,
    });
  } catch (err) {
    setFailed(`${err}`);
  }
}

function parseRepository(repo: string): string[] {
  if (!repo) {
    return [];
  }

  return repo.split(/\s+/);
}
