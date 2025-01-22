export const getValidationError = ({ email, password }) => {
  const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gi;
  const passRegexp = /^[a-zA-Z0-9._%+-]{1,}$/gi;

  if (!email.match(emailRegexp) && !password.match(passRegexp)) {
    return "Введены некорректные email и пароль";
  } else if (!email.match(emailRegexp)) {
    return "Введен некорректный email";
  } else if (!password.match(passRegexp)) {
    return "Введен некорректный пароль";
  } else {
    return "";
  }
};
