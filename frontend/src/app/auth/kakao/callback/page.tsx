"use client";

import { socialLogin } from "@/apis/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get("code");

  const loginAction = useCallback(async () => {
    try {
      const data = await socialLogin({ code, provider: "kakao" });

      if (data.accessToken && data.refreshToken) {
        router.push("/");
      } else {
        router.push("/auth/login");
      }
    } catch (e) {
      console.error(e);
      router.push("/auth/login");
    }
  }, [code, router]);

  useEffect(() => {
    if (!code) {
      router.push("/");
    }
    loginAction();
  }, [code, router, loginAction]);

  return <div>loading...</div>;
}
