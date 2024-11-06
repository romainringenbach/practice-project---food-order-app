import Meal from "../models/meal"
import React from "react";
import CustomButton from "./CustomButton.tsx";
import {motion} from "framer-motion";
import {currencyFormatter} from "../utils/formatting.ts"

const MealCard: React.FC<{cardData: Meal, handleAddToCart: () => void}> = (props) => {
    return (
        <motion.li className="bg-card-background rounded-2xl overflow-hidden text-center shadow" layout exit={{y: -30, opacity: 0}}>
            <article className="h-full flex flex-col justify-between items-center">
                <img src={'http://localhost:3000/'+props.cardData.image} className="w-full h-80 object-cover" />
                <h3 className="text-2xl font-bold mx-0 my-3">{props.cardData.name}</h3>
                <p className="inline-block bg-price-background text-price text-sm font-bold py-2 px-8 m-0 rounded">{currencyFormatter.format(props.cardData.price)}</p>
                <p className="m-4">{props.cardData.description}</p>
                <CustomButton extraClassName="mb-6" onClick={props.handleAddToCart}>Add to cart</CustomButton>
            </article>
        </motion.li>
    );
}

export default MealCard;