import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/home.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import ReviewProvider from "./Context/ReviewProvider.jsx";
import AddReviewCard from "./components/Review Components/AddReviewCard.jsx";
import ReviewCard from "./components/Review Components/ReviewCard.jsx";
import ReviewPost from "./components/Review Components/ReviewPost.jsx";
import EditReview from "./pages/EditReview.jsx";
import MyReview from "./pages/MyReview.jsx";
import UpdateProfile from "./components/profile Components/UpdateProfile.jsx";
import Profile from "./components/profile Components/Profile.jsx";
import EditProfile from "./pages/EditProfile.jsx";


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
        path: "/add-review",
        element: <AddReviewCard/>,
      },
      {
        path: "/post/:slug",
        element: <ReviewPost/>,
        
      },
      {
        path: "/edit-post/:slug",
        element: <EditReview/>,
        
      },
      {
        path: "/my-review",
        element: <MyReview/>,
        
      },
      {
        path: "/edit-Profile/:slug",
        element: <EditProfile/> ,
        
      },
      {
        path: "/my-profile/:slug",
        element: <Profile/>,
        
        
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <ReviewProvider>
    <RouterProvider router={routes} />
  </ReviewProvider>,
);
