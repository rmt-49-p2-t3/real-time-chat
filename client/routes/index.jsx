import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";

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
                element: <h1>HOME</h1>,
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