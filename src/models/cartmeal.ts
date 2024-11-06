import Meal from "./meal.ts";

class CartMeal extends Meal {
    quantity: number;

    constructor(id: string, name: string, price: number, description: string, image: string) {
        super(id,name,price,description,image);
        this.quantity = 1;
    }
}

export default CartMeal;

export const cartMealFromMeal = (meal: Meal) : CartMeal => {
    return new CartMeal(meal.id,meal.name,meal.price, meal.description, meal.image);
}