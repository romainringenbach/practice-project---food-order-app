import React, {useContext} from "react";
import CustomButton from "./CustomButton.tsx";
import CartMeal from "../models/cartmeal.ts";
import {CartContext} from "../store/cart-context.tsx";
import {motion} from "framer-motion";

interface CartItemProps {
    item: CartMeal
}

const CartItem = React.forwardRef<HTMLDivElement,CartItemProps>((props, ref) => {
    const context= useContext(CartContext);
    const buttonExtraClass = "bg-cart-actions-button-background text-cart-actions-button w-6 h-6 rounded-xl m-0 p-0 border-none flex justify-center items-center hover:bg-cart-actions-button-active-background active:bg-cart-actions-button-active-background hover:text-cart-actions-button-active active:text-cart-actions-button-active";
    return (
        <motion.div ref={ref}
                    className="flex justify-between items-center my-2 mx-0"
                    variants={{
                        hidden: {opacity: 0, x: "-10%", y: "0"},
                        visible: {opacity: 1, x: "0", y: "0"},
                    }}
                    initial="hidden"
                    animate="visible"
                    exit={{opacity: 0, x: "10%", y: "0"}}
                    transition={{
                        type: "spring",
                        opacity: {
                            ease: "easeInOut"
                        }
                    }}
        >
            <p className="m-0">{props.item.name}</p>
            <div className="flex gap-4 items-center">
                <CustomButton extraClassName={buttonExtraClass} onClick={() => context.removeItemFromCart(props.item.id)}>-</CustomButton>
                <p>{props.item.quantity}</p>
                <CustomButton extraClassName={buttonExtraClass} onClick={() => context.addItemToCart(props.item)}>+</CustomButton>
            </div>
        </motion.div>
    );
});

export default CartItem;