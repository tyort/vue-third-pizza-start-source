import doughSizes from "@/common/data/doughSizes";
import ingredients from "@/common/data/ingredients";
import sauces from "@/common/data/sauces";
import sizes from "@/common/data/sizes";

export const normalizeDough = (dough) => ({
  ...dough,
  value: doughSizes[dough.id],
});

export const normalizeSize = (size) => ({
  ...size,
  value: sizes[size.id],
});

export const normalizeIngredients = (ingredient) => ({
  ...ingredient,
  value: ingredients[ingredient.id],
  quantity: 0,
  ingredientId: ingredient.id,
});

export const normalizeSauces = (sauce) => ({
  ...sauce,
  value: sauces[sauce.id],
});

export const normalizeMisc = (misc) => ({
  ...misc,
  quantity: 0,
});

export const getImage = (image) => {
  return new URL(`../../assets/img/${image}`, import.meta.url).href;
};

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
