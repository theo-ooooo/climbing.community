"use client";

import Fetch from "@/apis/instance";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  // const data = await Fetch("/api/v1/members/me", {});
  // console.log(data);

  const getUser = async () => {
    const data = await Fetch("/api/v1/members/me", {});
    console.log(data);
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <div>
      <Link href='/auth/login'>로그인 페이지 가기</Link>
    </div>
  );
}
