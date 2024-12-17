"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get("code");

  useEffect(() => {
    if (!code) {
      router.push("/");
    }
    console.log("code", code);
  }, [code]);

  return <div>kakao callback page {searchParams.get("code")}</div>;
}
