import React from "react";
import NavbarAuth from "@/components/NavbarAuth";

const LayoutAuth = (props) => {
    const { children } = props;

    return (
        <main className="h-screen w-full flex flex-col">
            <NavbarAuth />
            <div className="w-full flex-grow overflow-auto flex flex-col lg:flex-row">
                {children}
            </div>
        </main>
    );
};

export default LayoutAuth;