import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href='/auth/login'>로그인 페이지 가기</Link>
    </div>
  );
}
