import {motion, MotionProps} from "framer-motion";
import React from "react";
import { twMerge } from 'tailwind-merge';

interface CustomButtonProps {
    extraClassName: string
}

const CustomButton: React.FC<CustomButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement> & MotionProps> = (props) => {
    const {extraClassName, ...realProps} = props;

    const normalColors = "text-button bg-button-background hover:bg-button-active-background hover:border-button-active-background active:bg-button-active-background active:border-button-active-background border-button-background";
    const disabledColors = "text-button-disabled bg-button-disabled-background";

    const baseClassName = "cursor-pointer border-2 border-solid py-2 px-6 rounded " + (realProps.disabled === true ? disabledColors : normalColors);

    return (
        <motion.button
            className={twMerge(baseClassName, extraClassName)}
            whileHover={realProps.disabled ? {} : {scale: 1.05}}
            whileTap={realProps.disabled ? {} : {scale: 1.02}}
            {...realProps}>{props.children}</motion.button>
    )
}

export default CustomButton;