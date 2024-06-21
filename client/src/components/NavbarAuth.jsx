import { Link, useLocation } from "react-router-dom";

const NavbarAuth = () => {
    const location = useLocation();
    const linkPath = location.pathname === "/register" ? "/login" : "/register";
    const linkText = location.pathname === "/register" ? "Login" : "Register";
    return (
        <>
            <div className="navbar bg-base-100">
                <div className="navbar-start">

                    <a className="btn btn-ghost text-xl">real*</a>
                </div>
                <div className="navbar-end">
                    <Link to={linkPath} className="btn">{linkText}</Link>
                </div>
            </div>
        </>
    );
};

export default NavbarAuth;