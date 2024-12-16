import KakaoLoginLogo from "./assets/oauth/kakao/kakao_login_medium_wide.png";

function App() {
  const login = () => {
    window.open(
      "http://localhost:4000/api/v1/auth/kakao",
      "kakao",
      "width=600, height=600"
    );
  };
  return (
    <a href='http://localhost:4000/auth/kakao'>
      <img src={KakaoLoginLogo} />
    </a>
  );
}

export default App;
