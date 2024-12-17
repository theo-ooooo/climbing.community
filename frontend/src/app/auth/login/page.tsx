import KakaoLogin from "@/components/auth/KakaoLogin";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (accessToken && refreshToken) {
    redirect("/");
  }
  return (
    <div>
      로그인 페이지 <KakaoLogin />
    </div>
  );
}
