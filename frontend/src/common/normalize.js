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
