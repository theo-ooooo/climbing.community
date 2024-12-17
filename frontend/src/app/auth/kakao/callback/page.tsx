"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get("code");

  const loginAction = async () => {
    const data = await fetch("http://localhost:4000/api/v1/auth/social-login", {
      method: "POST",
      body: JSON.stringify({ code, provider: "kakao" }),
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    });

    return data.json();
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
