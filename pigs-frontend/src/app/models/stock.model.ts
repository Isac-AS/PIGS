export interface Order {
  dishes: Dish[],
  menus: Menu[],
  price: number,
  id: string,
}

export interface Menu {
  name: string,
  dishes: Dish[],
  path: "menus"
  id: string,
}

export interface Dish {
  name: string,
  ingredients: DishIngredient[],
  path: "dishes",
  id: string,
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
  path: "ingredients",
  id: string,
}
