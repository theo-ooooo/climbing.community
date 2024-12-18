import Fetch from "../instance";
import { MembersMeResponse } from "../members";

interface GetMembersMeRequest {
  accessToken?: string;
}

// 서버에서 실행할때에는 전달 받고, 아니면 안받는다.
export async function getMembersMe(
  request: GetMembersMeRequest
): Promise<MembersMeResponse> {
  const data = await Fetch<MembersMeResponse>("/api/v1/members/me", {
    method: "GET",
    headers: request?.accessToken
      ? {
          Cookie: `accessToken=${request.accessToken}`,
        }
      : undefined,
  });

  return data;
}
