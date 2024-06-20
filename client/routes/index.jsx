import NavbarChat from "@/components/NavbarChat";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import Chat from "@/pages/Chat/Chat";

import {
    createBrowserRouter,
    Outlet,
    redirect,
    RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
    {
        element: (
            <>
                <NavbarChat />
                <Outlet />
            </>
        ),
        loader: () => {
            if (!localStorage.getItem('access_token')) {
                return redirect('/login');
            }
            return null;
        },
        children: [
            {
                path: "/",
                element: <Chat />,
            },
        ]
    },
    {
        path: "/login",
        element: <Login />,
        loader: () => {
            if (localStorage.getItem('access_token')) {
                return redirect('/');
            }
            return null;
        }
    },
    {
        path: "/register",
        element: <Register />,
        loader: () => {
            if (localStorage.getItem('access_token')) {
                return redirect('/');
            }
            return null;
        }
    },
]);

const App = () => {
    return (
        <RouterProvider router={router} />
    );
}

export default App;