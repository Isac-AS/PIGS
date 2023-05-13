export interface Order {
  dishes: Dish[],
  menus: Menu[],
  price: number,
  path: "orders",
  id: string,
}

export interface Menu {
  name: string,
  dishes: Dish[],
  price: number,
  path: "menus"
  id: string,
}

export interface Dish {
  name: string,
  ingredients: DishIngredient[],
  price: number,
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

export interface AuxItem {
  name: string,
  quantity: number,
  minThreshold: number,
  maxThreshold: number,
  path: "auxItems",
  id: string,
}
