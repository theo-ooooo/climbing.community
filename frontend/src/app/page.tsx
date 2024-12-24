import { getMembersMe } from "@/apis/interface/members";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Home() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (accessToken && refreshToken) {
    const data = await getMembersMe({ accessToken });

    console.log(data);
  }

  return (
    <div>
      <Link href='/auth/login'>로그인 페이지 가기</Link>
    </div>
  );
}
