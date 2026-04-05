import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/home.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";

const routes=createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/',
        element:<Home/>

      },
      {
        path:'/signup',
        element:<Signup/>

      },
      {
        path:'/login',
        element:<Login/>
      },
    ]
  }
])

createRoot(document.getElementById("root")).render(
  <RouterProvider router={routes}>
    <StrictMode>
      <App />
    </StrictMode>
    ,
  </RouterProvider>,
);
