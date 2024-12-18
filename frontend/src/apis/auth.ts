import Fetch from "./instance";
import { TokenResponse } from "./interface/auth";

interface SocialLoginRequest {
  provider: string;
  code?: string | null;
}

interface RefreshRequest {
  refreshToken: string;
}

export async function socialLogin(
  request: SocialLoginRequest
): Promise<TokenResponse> {
  const data = await Fetch<TokenResponse>("/api/v1/auth/social-login", {
    method: "POST",
    body: request,
  });

  return data;
}

export async function refresh(request: RefreshRequest): Promise<TokenResponse> {
  const data = await Fetch<TokenResponse>("/api/v1/auth/refresh", {
    method: "POST",
    headers: {
      Cookie: `refreshToken=${request.refreshToken}`,
    },
  });

  return data;
}
