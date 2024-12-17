"use client";

import Fetch from "@/apis/instance";
import { SocialLoginType } from "@/apis/interface/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get("code");

  const loginAction = async () => {
    try {
      const data = await Fetch<SocialLoginType>("/api/v1/auth/social-login", {
        method: "POST",
        body: JSON.stringify({ code, provider: "kakao" }),
      });

      if (data.accessToken && data.refreshToken) {
        router.push("/");
      } else {
        router.push("/auth/login");
      }
    } catch (e) {
      console.error(e);
      router.push("/auth/login");
    }
  };

  useEffect(() => {
    if (!code) {
      router.push("/");
    }
    loginAction().then(() => {
      router.push("/");
    });
  }, [code]);

  return <div>loading...</div>;
}
