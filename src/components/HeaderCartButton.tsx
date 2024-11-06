import React, {useContext} from "react";
import CustomTextButton from "./CustomTextButton.tsx";
import {CartContext} from "../store/cart-context.tsx";

const HeaderCartButton: React.FC = () => {
    const context= useContext(CartContext);

    return (
        <CustomTextButton onClick={() => context.setCheckoutFlowStep(1)}
                          extraClassName="text-2xl font-header">{"Cart (" + context.getNumberOfItems() + ")"}</CustomTextButton>
    );
}

export default HeaderCartButton;