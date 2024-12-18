interface KakaoAuthParams {
  redirectUri?: string;
  nonce?: string;
  state?: string;
}

declare global {
  interface Window {
    Kakao: {
      init: (keyValue: string) => void;
      isInitialized: () => boolean;
      Auth: {
        authorize: (prams: KakaoAuthParams) => void;
      };
    };
  }
}

export {};
