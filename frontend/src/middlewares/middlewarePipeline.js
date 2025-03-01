export const middlewarePipeline = (router) => {
  router.beforeEach(async (to, from) => {
    const middlewares = to.meta.middlewares;
    if (!middlewares) {
      // При переходе по обычному пути, где в routes нет middlewares
      return true;
    }
    for (const middleware of middlewares) {
      const result = await middleware({ to, from });
      if (
        typeof result === "object" ||
        typeof result === "string" ||
        result === false
      ) {
        // Например, result получаем в виде объекта { path: "/login", query: { redirect: "/user/profile" } }. Это вследствие работы middleware isLoggedIn, прописанном для пути
        // URL выглядит примерно так http://localhost:8081/login?redirect=/user/profile при переходе по пути, где прописан middleware isLoggedIn.
        return result;
      }
    }
    // Если в routes для пути прописаны middlewares. но они не сработали
    return true;
  });
};
