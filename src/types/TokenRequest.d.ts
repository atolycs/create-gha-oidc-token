import type { HttpClientResponse } from "@actions/http-client";

export type ResponseHeaderPayload = {
  token: string;
  message?: string;
  expires_at: string;
  github_username: string;
  github_commitEmail: string;
};
