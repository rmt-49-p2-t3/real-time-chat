import { Link, useNavigate } from "react-router-dom";

const NavbarChat = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('access_token');
        navigate('/login');
    };
    return (
        <>
            <div className="navbar bg-base-100">
                <div className="navbar-start">

                    <a className="btn btn-ghost text-xl">real*</a>
                </div>
                <div className="navbar-end">
                    <button onClick={handleLogout} className="btn">Logout</button>
                </div>
            </div>
        </>
    );
};

export default NavbarChat;