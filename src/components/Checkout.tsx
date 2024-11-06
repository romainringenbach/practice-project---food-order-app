import CustomDialog from "./CustomDialog.tsx";
import React, {useContext, useEffect, useRef} from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { twMerge } from 'tailwind-merge';
import Customer from "../models/customer.ts";
import {currencyFormatter} from "../utils/formatting.ts";
import {CartContext} from "../store/cart-context.tsx";

interface IFormInput {
    fullName: string;
    email: string;
    street: string;
    postalCode: string;
    city: string;
}

const Checkout: React.FC<{handleClose: () => boolean, handleSubmitted: () => void, placeOrder: (customer: Customer) => void}> = (props) => {
    const context= useContext(CartContext);
    const total = context.getTotal();
    const formRef = useRef<HTMLFormElement>(null);
    const { register, handleSubmit, reset , watch, clearErrors, formState: { errors }} = useForm<IFormInput>({mode: 'onSubmit', reValidateMode: 'onBlur'})

    function submitOrder(data: IFormInput){
        const customer: Customer = {
            name: data.fullName,
            email: data.email,
            street: data.street,
            postalCode: data.postalCode,
            city: data.city
        }

        props.placeOrder(customer);
    }

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        submitOrder(data);
        reset();
        context.clearCart();
        props.handleSubmitted();
    }

    function handleValid(){
        if(formRef.current){
            if(formRef.current.checkValidity()){
                formRef.current.requestSubmit();
                return true;
            } else {
                formRef.current.reportValidity();
            }
        }
        return false;
    }

    const labelClassName: string = "font-bold mb-2";
    const inputClassName: string = "w-full max-w-80 p-2 rounded border-2 border-solid border-checkout-input-border invalid:border-checkout-input-border-invalid user-invalid:border-checkout-input-border-invalid";
    const inputErrorClassName = twMerge(inputClassName, "border-checkout-input-border-invalid");

    const validateEmail = (email: string) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const validateZipCode = (zipCode: string) => {
        return String(zipCode)
            .toLowerCase()
            .match(
                /(^\d{5}$)|(^\d{5}-\d{4}$)/
            );
    };

    useEffect(() => {
        const subscription = watch((_value, field) => {
                clearErrors(field.name);
            }
        )
        return () => subscription.unsubscribe()
    }, [watch,clearErrors])

    return (
        <>

            <CustomDialog title="Checkout" onCancel={props.handleClose} onValid={handleValid} cancelText="Close" validText="Submit Order" enableValid={true}>
                <p>{"Total Amount: " + currencyFormatter.format(total)}</p>
                <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="my-2 mx-0 flex flex-col">
                    <label htmlFor="fullname" className={labelClassName}>Full Name</label>
                    <input id="fullname" {...register("fullName", { required: true })} className={errors.fullName ? inputErrorClassName : inputClassName} aria-invalid={errors.fullName ? "true" : "false"}/>
                    {errors.fullName?.type === "required" && (
                        <p role="alert">Fullname is required</p>
                    )}

                    <label htmlFor="email" className={labelClassName}>E-Mail Address</label>
                    <input id="email" {...register("email", { required: true, validate: value => validateEmail(value) != null }) } className={errors.email ? inputErrorClassName : inputClassName} aria-invalid={errors.email ? "true" : "false"}/>
                    {errors.email?.type === "required" && (
                        <p role="alert">Email is required</p>
                    )}
                    {errors.email?.type === "validate" && (
                        <p role="alert">{"E-Mail is not a valid address"}</p>
                    )}

                    <label htmlFor="street" className={labelClassName}>Street</label>
                    <input id="street" {...register("street", { required: true })} className={errors.street ? inputErrorClassName : inputClassName} aria-invalid={errors.street ? "true" : "false"}/>
                    {errors.street?.type === "required" && (
                        <p role="alert">Street is required</p>
                    )}

                    <div className="flex justify-start gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="postalcode" className={labelClassName}>Postal Code</label>
                            <input id="postalcode" {...register("postalCode", {required: true, validate: value => validateZipCode(value) != null })}
                                   className={errors.postalCode ? inputErrorClassName : inputClassName} aria-invalid={errors.postalCode ? "true" : "false"}/>
                            {errors.postalCode?.type === "required" && (
                                <p role="alert">Postal code is required</p>
                            )}
                            {errors.postalCode?.type === "validate" && (
                                <p role="alert">{"Postal code is not a valid zip code"}</p>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="city" className={labelClassName}>City</label>
                            <input id="city" {...register("city", {required: true})} className={errors.city ? inputErrorClassName : inputClassName} aria-invalid={errors.city ? "true" : "false"}/>
                            {errors.city?.type === "required" && (
                                <p role="alert">City is required</p>
                            )}
                        </div>
                    </div>
                </form>
            </CustomDialog>
        </>

    );
}

export default Checkout;