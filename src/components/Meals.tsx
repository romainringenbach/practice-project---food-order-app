import React, {useContext, useMemo} from "react";
import MealCard from "./MealCard.tsx";
import { motion, AnimatePresence } from "framer-motion";
import CustomAlert from "./CustomAlert.tsx";
import {useFetch} from "../hooks/useFetch.ts";
import Meal from "../models/meal.ts";
import {fetchMeals} from "../http.ts";
import {CartContext} from "../store/cart-context.tsx";

const Meals: React.FC = () => {
    const {fetchedData, error} = useFetch<Meal[]>(fetchMeals,[]);

    const context= useContext(CartContext);

    function handleAddItemToCart(item: Meal){
        context.addItemToCart(item);
    }

    const meals = fetchedData;

    const mealsListComponent = useMemo(() => {
        return (
            <AnimatePresence mode="wait">
                <motion.ul className="w-11/12 max-w-[70rem] list-none my-8 mx-auto p-4 grid grid-cols-meals-layout gap-4" key="list" initial={{opacity: 0, y: -20}} animate={{opacity: 1, y: 0}} exit={{y: -20, opacity: 0}}>
                    <AnimatePresence>
                        {meals.map((meal) => {
                            return (<MealCard key={meal.id} cardData={meal} handleAddToCart={() => {
                                handleAddItemToCart(meal);
                            }}>
                            </MealCard>);
                        })}
                    </AnimatePresence>
                </motion.ul>
            </AnimatePresence>
        );
    }, [meals])

    return (
        <>
            <AnimatePresence>
                {error != '' && <CustomAlert title="Error while fetching meals :(" message={error} clearAlert={() => {}}></CustomAlert>}
            </AnimatePresence>
            {mealsListComponent}
        </>

    );
}

export default Meals

