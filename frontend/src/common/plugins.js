export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

/* Создаём объект с методом install */
export const capitalizePlugin = {
  install(app) {
    /* Добавляем метод глобально во всё приложение */
    app.config.globalProperties.$capitalize = capitalize;
  },
};
