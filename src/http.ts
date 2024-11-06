import Meal from "./models/meal"
import Customer from "./models/customer"

export async function  fetchMeals() : Promise<Meal[]> {
    const response = await fetch('http://localhost:3000/meals');
    const resData = await response.json();

    if(!response.ok){
        throw new Error('Failed to fetch meals');
    }

    return resData;
}

export type Order = {
    items: Meal[],
    customer: Customer
}

export async function placeUserOrder(order : Order): Promise<string> {

    const response = await fetch(`http://localhost:3000/orders`, {
        method: 'POST',
        body: JSON.stringify({ 'order': {"items": order.items, "customer": {...order.customer, ['postal-code']: order.customer.postalCode}}}),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const resData = await response.json();

    if(!response.ok){
        throw new Error('Failed to place order');
    }

    return resData.message;
}