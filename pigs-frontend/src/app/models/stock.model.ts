export interface Order {
  dishes: Dish[],
  menus: Menu[],
  price: number,
}

export interface Menu {
  name: string,
  dishes: Dish[],
  path: "menus"
}

export interface Dish {
  name: string,
  ingredients: DishIngredient[],
  path: "dishes"
}

export interface DishIngredient {
  amount: number,
  ingredient: Ingredient,
}

export interface Ingredient {
  name: string,
  quantity: number,
  minThreshold: number,
  maxThreshold: number,
  path: "ingredients"
}
