import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/home.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import ReviewProvider from "./Context/ReviewProvider.jsx";
import Profile from "./pages/Profile.jsx";
import PostDetails from "./components/Posts/PostDetails.jsx";
import MyPost from "./pages/MyPost.jsx";
import PostForm from "./components/Posts/PostForm.jsx";
import EditPost from "./pages/EditPost.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/add-post",
        element: <PostForm />,
      },
      {
        path: "/post/:slug",
        element: <PostDetails />,
      },
      {
        path: "/edit-post/:slug",
        element: <EditPost />,
      },
      {
        path: "/my-post",
        element: <MyPost />,
      },

      {
        path: "/profile/:slug",
        element: <Profile />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <ReviewProvider>
    <RouterProvider router={routes} />
  </ReviewProvider>,
);
