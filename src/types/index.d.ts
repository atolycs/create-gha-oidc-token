import type {
  GetTokenParams as _GetTokenParams,
  TokenPayload as _TokenPayload,
} from "./TokenParams.d.ts";

import type { ResponseHeaderPayload as _ResponseHeaderPayload } from "./TokenRequest.d.ts";

declare global {
  type GetTokenParams = _GetTokenParams;
  type TokenPayload = _TokenPayload;
  type ResponseHeader = _ResponseHeaderPayload;
}
