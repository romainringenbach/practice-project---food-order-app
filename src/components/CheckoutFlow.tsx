import React, {useContext} from "react";
import {AnimatePresence} from "framer-motion";
import Cart from "./Cart.tsx";
import Checkout from "./Checkout.tsx";
import CustomAlert from "./CustomAlert.tsx";
import {CartContext} from "../store/cart-context.tsx";
import {usePost} from "../hooks/usePost.ts";
import {Order, placeUserOrder} from "../http.ts";
import Customer from "../models/customer.ts";

const CheckoutFlow: React.FC = () => {
    const context= useContext(CartContext);
    const placeOrder = usePost<string, Order>(placeUserOrder,'');

    function handleClose(){
        context.setCheckoutFlowStep(0);
        return true;
    }

    function handleGoToCheckout(){
        context.setCheckoutFlowStep(2);
        return true;
    }

    function handleCheckoutValidated(){
        context.setCheckoutFlowStep(3);
    }

    function handlePlaceOrder(customer: Customer){
        placeOrder.post({customer, items: context.items});
    }

    return (
        <AnimatePresence>
            {context.checkoutFlowStep === 1 && <Cart handleClose={handleClose} handleGoToCheckout={handleGoToCheckout}></Cart>}
            {context.checkoutFlowStep === 2 && <Checkout handleClose={handleClose} handleSubmitted={handleCheckoutValidated} placeOrder={handlePlaceOrder}></Checkout>}
            {context.checkoutFlowStep === 3 && placeOrder.result != '' && placeOrder.error === '' && <CustomAlert title={placeOrder.result} message="" clearAlert={handleClose}></CustomAlert>}
            {context.checkoutFlowStep === 3 && placeOrder.error != '' && <CustomAlert title="Sorry, we could nod place your order :(" message={placeOrder.error} clearAlert={handleClose}></CustomAlert>}
        </AnimatePresence>
    );
}

export default CheckoutFlow;