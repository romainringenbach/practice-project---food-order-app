import {useContext} from "react";
import { motion, AnimatePresence } from "framer-motion";
import CustomDialog from "./CustomDialog.tsx";
import CartItem from "./CartItem.tsx";
import {currencyFormatter} from "../utils/formatting.ts";
import {CartContext} from "../store/cart-context.tsx";

const Cart: React.FC<{handleClose: () => boolean, handleGoToCheckout: () => boolean}> = (props) => {
    const context= useContext(CartContext);
    const total = context.getTotal();
    const hasItems = context.items.length > 0;

    const listHeight = `${context.items.length * 1.5 + (context.items.length -1) * 1 }rem`;

    const cartItemsList = (
        <>
            <AnimatePresence mode="wait">
                <motion.ul className="list-none my-2 mx-0 p-0" key="cart" initial={{opacity: 0, height: listHeight}}
                           animate={{opacity: 1, height: listHeight}} exit={{opacity: 0, height: 0}}
                           transition={{
                               type: "spring",
                               stiffness: 100,
                               height: {
                                   ease: "easeInOut"
                               },
                               opacity: {
                                   ease: "easeInOut"
                               }
                }}
                >
                    <AnimatePresence mode="popLayout">
                        {context.items.map((item) => (
                            <CartItem key={item.id} item={item}></CartItem>
                        ))}
                    </AnimatePresence>
                </motion.ul>
            </AnimatePresence>
            <p className="flex justify-end my-8 mx-0 text-lg font-bold text-cart-total">{currencyFormatter.format(total)}</p>
        </>

    );

    const noItems = (
        <motion.p
            initial={{opacity: 0, height: "2.5rem"}}
            animate={{opacity: 1, height: "1.5rem"}} exit={{opacity: 0, height: 0}}
            transition={{
                type: "spring",
                stiffness: 100,
                height: {
                        ease: "easeInOut"
                },
                opacity: {
                    ease: "easeInOut"
                }

            }}
        >
            You have no item on your cart :(
        </motion.p>
    );

    return (
        <CustomDialog title="Your Cart" onCancel={props.handleClose} onValid={props.handleGoToCheckout} cancelText="Close" validText="Go to Checkout" enableValid={hasItems}>
            {hasItems ? cartItemsList : noItems}
        </CustomDialog>
    );
}

export default Cart;