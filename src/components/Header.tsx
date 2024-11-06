import React from "react";
import logo from "../assets/logo.jpg";
import HeaderCartButton from "./HeaderCartButton.tsx";

const Header: React.FC = () => {
    return (
        <header className="flex justify-between align-center py-4 px-[10%]">
            <div className="flex gap-4 align-center">
                <img src={logo} alt="logo"
                     className="w-12 h-12 object-contain rounded-full border-2 border-solid border-logo-border"/>
                <h1 className="font-header font-bold text-3xl m-0 text-logo-border tracking-wide uppercase">ReactFood</h1>
            </div>
            <HeaderCartButton></HeaderCartButton>
        </header>


    );
}

export default Header;