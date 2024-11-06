import Meal from "../models/meal.ts";
import CartMeal from "../models/cartmeal.ts";
import {cartMealFromMeal} from "../models/cartmeal.ts";
import React, {useReducer} from "react";

type CartAction =
    | {type: 'ADD', item: Meal}
    | {type: 'REMOVE', id: string}
    | {type: 'CLEAR'}
    | {type: 'SET_CHECKOUT_STEP_FLOW', step: number};

interface CartState {
    items: CartMeal[];
    checkoutFlowStep: number;
}

function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case 'ADD':
            {
                const updatedItems = [...state.items];
                const existingCartItemIndex = state.items.findIndex(value => value.id === action.item.id);
                if(existingCartItemIndex >= 0){
                    const existingItem = state.items[existingCartItemIndex];
                    const updatedCartItem = {
                        ...existingItem,
                        quantity: existingItem.quantity + 1,
                    }
                    updatedItems[existingCartItemIndex] = updatedCartItem;
                } else {
                    updatedItems.push(cartMealFromMeal(action.item))
                }

                return {...state, items: updatedItems};
            }
        case 'REMOVE':
            {
                const updatedItems = [...state.items];
                const existingCartItemIndex = state.items.findIndex(value => value.id === action.id);
                if(existingCartItemIndex >= 0){
                    const existingItem = state.items[existingCartItemIndex];
                    const updatedCartItem = {
                        ...existingItem,
                        quantity: existingItem.quantity - 1,
                    }

                    if(updatedCartItem.quantity > 0){
                        updatedItems[existingCartItemIndex] = updatedCartItem;
                    } else {
                        updatedItems.splice(existingCartItemIndex, 1);
                    }
                }

                return {...state, items: updatedItems};
            }
        case 'CLEAR':
            return {...state, items: []};
        case 'SET_CHECKOUT_STEP_FLOW':
            return {...state, checkoutFlowStep: action.step};
        default:
            return state;
    }
}

type CartContextObj = {
    items: CartMeal[];
    addItemToCart: (item: Meal) => void;
    removeItemFromCart: (itemId: string) => void;
    getNumberOfItems: () => number;
    getTotal: () => number;
    clearCart: () => void;
    checkoutFlowStep: number;
    setCheckoutFlowStep: (step: number) => void;
}

export const CartContext = React.createContext<CartContextObj>({
    items: [],
    addItemToCart: (item: Meal) => {console.log(item)},
    removeItemFromCart: (itemId: string) => {console.log(itemId)},
    getNumberOfItems: () => 0,
    getTotal: () => 0,
    clearCart: () => {},
    checkoutFlowStep: 0,
    setCheckoutFlowStep: (step: number) => {console.log(step)}
})

type Props = {
    children?: React.ReactNode
};

const CartContextProvider: React.FC<Props> = (props) => {
    const [state, dispatch] = useReducer(cartReducer, {items: [], checkoutFlowStep: 0});

    const addItemToCartHandler = (item: Meal) => {
        dispatch({type: 'ADD', item});
    }

    const removeItemFromCartHandler = (itemId: string) => {
        dispatch({type: 'REMOVE', id: itemId});
    }

    const getNumberOfItems = () => {
        return state.items.reduce((previousValue, currentValue) => {
            return previousValue + currentValue.quantity;
        }, 0);
    }

    const getTotal = () => {
        return state.items.reduce((previousValue, currentValue) => {
            return previousValue + currentValue.quantity * currentValue.price;
        }, 0);
    }

    const clearCart = () => {
        dispatch({type: 'CLEAR'});
    }

    const setCheckoutFlowStep = (step: number) => {
        dispatch({type: 'SET_CHECKOUT_STEP_FLOW', step});
    }

    const contextValue: CartContextObj = {
        items: state.items,
        addItemToCart: addItemToCartHandler,
        removeItemFromCart: removeItemFromCartHandler,
        getNumberOfItems: getNumberOfItems,
        getTotal: getTotal,
        clearCart: clearCart,
        checkoutFlowStep: state.checkoutFlowStep,
        setCheckoutFlowStep: setCheckoutFlowStep
    }

    return (
        <CartContext.Provider value={contextValue}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartContextProvider;
