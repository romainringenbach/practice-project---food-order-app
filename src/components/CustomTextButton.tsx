import {motion, MotionProps} from "framer-motion";
import React from "react";
import { twMerge } from 'tailwind-merge';

interface CustomButtonProps {
    extraClassName: string
}

const CustomTextButton: React.FC<CustomButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement> & MotionProps> = (props) => {
    const {extraClassName, ...realProps} = props;

    const baseClassName = "cursor-pointer bg-transparent border-none text-button-background hover:text-button-active-background active:text-button-active-background";

    return (
        <motion.button className={twMerge(baseClassName, extraClassName)}
                       whileHover={realProps.disabled ? {} : {scale: 1.1}}
                       whileTap={realProps.disabled ? {} : {scale: 1.05}}
                       {...realProps}
                       >{props.children}</motion.button>
    )
}

export default CustomTextButton;