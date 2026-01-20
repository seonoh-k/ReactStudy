import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// 유저 정보 타입 지정
export type User = {
  email: string;
  username: string;
}

// 인증 스토어 타입 지정
export type AuthStore = {
  user: User | null;
  accessToken: string | null; // 액세스 토큰
  setAuth: (user: User, accessToken: string) => void; // 인증 정보 저장
  unsetAuth: () => void; // 인증 정보 초기화
}

// 인증 스토어 커스텀 훅 작성
export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      setAuth: (user, accessToken) => set({user, accessToken}),
      unsetAuth: () => set({user: null, accessToken: null}),
    }),
    // 인증 정보를 로컬 스토리지에 저장.
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({user: state.user}),
    }
  )
);