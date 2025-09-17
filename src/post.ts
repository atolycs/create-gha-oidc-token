import { debug, getState, info } from "@actions/core";

const main = async () => {
  info(`==> Revoking Access Token...`);

  const token = getState("token");
  const url = "https://api.github.com/installation/token";

  const response = await fetch(url, {
    method: "DELETE",
    headers: new Headers({
      Authorization: `Bearer ${token}`,
    }),
  });

  if (response.ok) {
    info(`==> Access token revoked successfully!`);
    info(`==> Thank you using this Action.`);
  }
};

main();
