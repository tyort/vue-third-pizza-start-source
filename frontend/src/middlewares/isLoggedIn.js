import { useProfileStore } from "@/stores";

export const isLoggedIn = ({ to }) => {
  const profileStore = useProfileStore();

  if (!profileStore.userData) {
    /* Сохраняем маршрут, по которому пользователь намеревался перейти,
     * чтобы перенаправить на него пользователя после успешной авторизации
     */
    return { path: "/login", query: { redirect: to.fullPath } };
  } else {
    return true;
  }
};
