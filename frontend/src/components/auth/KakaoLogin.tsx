"use client";

import Script from "next/script";
import SocialLoginButton from "../button/SocialLoginButton";

export default function KakaoLogin() {
  const init = () => {
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_SDK_KEY ?? "");
  };

  const onClick = () => {
    window.Kakao.Auth.authorize({
      redirectUri: process.env.NEXT_PUBLIC_KAKAO_LOGIN_REDIRECT_URI,
    });
  };

  return (
    <>
      <Script
        src='https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js'
        integrity='sha384-DKYJZ8NLiK8MN4/C5P2dtSmLQ4KwPaoqAfyA/DfmEc1VDxu4yyC7wy6K1Hs90nka'
        crossOrigin='anonymous'
        onLoad={init}
      />
      <SocialLoginButton type='kakao' onClick={onClick} />
    </>
  );
}
