import { lazy } from "react";

const Home = lazy(() => import("../pages/Home"));
const Cart = lazy(() => import("../pages/Cart"));
const Search = lazy(() => import("../pages/Search"));
const Favorites = lazy(() => import("../pages/Favorites"));
const ProductDetail = lazy(() => import("../pages/ProductDetail"));
const Category = lazy(() => import("../pages/Category"));
const Brand = lazy(() => import("../pages/Brand"));
const Post = lazy(() => import("../pages/Post"));
const Profile = lazy(() => import("../pages/Profile"));

export const publicRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/favorites",
    element: <Favorites />,
  },
  {
    path: "/product/view/:slug",
    element: <ProductDetail />,
  },
  {
    path: "/category/:slug",
    element: <Category />,
  },
  {
    path: "/brand/:slug",
    element: <Brand />,
  },
  {
    path: "/post/:slug",
    element: <Post />,
  },
  {
    path: "/post/view/:id",
    element: <Post />,
  },
];

export const clientRoutes = [
  {
    path: "/profile",
    element: <Profile />,
  },
];
