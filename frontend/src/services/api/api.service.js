import axios, { AxiosError } from "axios";

class ApiError extends Error {
  constructor(message, response) {
    super(message); // message передается родительскому классу `Error`
    this.response = response;
  }
}

export class ApiService {
  _getError(e) {
    if (e instanceof AxiosError) {
      /* Возвращаем ошибку, содержащую сообщение об ошибке и ответ сервера */
      /* Если имеем дело с ошибкой Axios, пытаемся получить сообщение, которое отправил бэкенд */
      return new ApiError(
        e.response.data?.error?.message ?? e.message,
        e.response
      );
    } else {
      /* Возвращаем ошибку, содержащую сообщение об ошибке и ответ сервера */
      return new ApiError(e.message, e.response);
    }
  }

  /* Функция для запросов без тела: GET, DELETE */
  _wrapper1(method, url) {
    return async () => {
      try {
        const response = await method(url);
        return {
          __state: "success",
          ...response,
        };
      } catch (e) {
        return {
          __state: "error",
          data: this._getError(e),
        };
      }
    };
  }

  /* Функция для запросов с телом: POST, PUT */
  _wrapper2(method, url, payload) {
    return async () => {
      try {
        const response = await method(url, payload);
        return {
          __state: "success",
          ...response,
        };
      } catch (e) {
        return {
          __state: "error",
          data: this._getError(e),
        };
      }
    };
  }

  $get(url) {
    return this._wrapper1(axios.get, url)();
  }

  $post(url, payload) {
    return this._wrapper2(axios.post, url, payload)();
  }

  $put(url, payload) {
    return this._wrapper2(axios.put, url, payload)();
  }

  $delete(url) {
    return this._wrapper1(axios.delete, url)();
  }
}
