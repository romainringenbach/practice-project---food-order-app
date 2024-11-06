import React, {useEffect, useRef} from "react";
import {createPortal} from "react-dom";
import {motion} from "framer-motion";
import CustomButton from "./CustomButton.tsx";

const CustomAlert: React.FC<{title: string, message: string, clearAlert: () => void}> = (props) => {
    const modalElementRef = useRef<HTMLDialogElement>(null);
    const {title, message, clearAlert, ...realProps} = props;

    useEffect(() => {
        modalElementRef.current!.showModal();
    })

    function handleOk(){
        modalElementRef.current!.close();
        clearAlert();
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
                        layout
        >
            <h2 className="my-4 mx-0 font-bold text-2xl">{title}</h2>
            <p>{message}</p>
            <div className="flex justify-end gap-4">
                <CustomButton onClick={handleOk} extraClassName="">Ok</CustomButton>
            </div>
        </motion.dialog>,
        document.getElementById('modal')!
    )
}

export default CustomAlert;