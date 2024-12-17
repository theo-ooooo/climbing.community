import KakaoIcon from "../icon/Kakao";
import style from "./SocialLoginButton.module.css";

interface Props {
  type: "kakao";
  onClick?: () => void;
}

export default function SocialLoginButton({ type, onClick }: Props) {
  if (type === "kakao") {
    return (
      <button type='button' className={style.kakao} onClick={onClick}>
        <KakaoIcon />
        Kakao로 계속하기
      </button>
    );
  }
}
