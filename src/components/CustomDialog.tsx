import {motion, MotionProps} from "framer-motion";
import React, {useEffect, useRef} from "react";
import {createPortal} from "react-dom";
import CustomTextButton from "./CustomTextButton.tsx";
import CustomButton from "./CustomButton.tsx";

interface DialogProps {
    onCancel: () => boolean;
    onValid: () => boolean;
    cancelText: string;
    validText: string;
    enableValid: boolean;
    title: string;
}

const CustomDialog: React.FC<React.DialogHTMLAttributes<HTMLDialogElement> & MotionProps & DialogProps> = (props) => {
    const modalElementRef = useRef<HTMLDialogElement>(null);
    const {onCancel, onValid, cancelText, validText, enableValid, title, ...realProps} = props;

    useEffect(() => {
        modalElementRef.current!.showModal();
    })

    function handleCancel(){
        if(onCancel())
            modalElementRef.current!.close();
    }

    function handleValid(){
        if(onValid())
            modalElementRef.current!.close();
    }

    return createPortal(
        <motion.dialog ref={modalElementRef} {...realProps}
                       className="backdrop-invert backdrop-opacity-55 bg-modal-background border-[6px] border-none m-0 p-4 w-4/5 max-w-[40rem] z-10 fixed left-1/2 top-1/2 rounded"
                       variants={{
                           hidden: {opacity: 0, x: "-50%", y: "-100%"},
                           visible: {opacity: 1, x: "-50%", y: "-50%"},
                       }}
                       initial="hidden"
                       animate="visible"
                       exit={{opacity: 0, x: "-50%", y: "-50%"}}
        >
            <h2 className="my-4 mx-0 font-bold text-2xl">{title}</h2>
            {props.children}
            <div className="flex justify-end gap-4">
                <CustomTextButton onClick={handleCancel}
                                  extraClassName="text-cart-text hover:text-cart-text-active active:text-cart-text-active">{cancelText}</CustomTextButton>
                <CustomButton onClick={handleValid} extraClassName=""
                              disabled={!enableValid}>{validText}</CustomButton>
            </div>
        </motion.dialog>,
        document.getElementById('modal')!
    )
}

export default CustomDialog;