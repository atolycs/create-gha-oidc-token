export interface GetTokenParams {
  providerEndpoint: string;
  audience: string;
  repositories: string[];
}

export interface TokenPayload {
  api_url: string;
  repositories?: string[];
}
