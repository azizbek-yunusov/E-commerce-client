import { Suspense, lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import NetworkStatus from "./components/Helpers/NetworkStatus";
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const NotFound = lazy(() => import("./pages/NotFound"));
const CheckOut = lazy(() => import("./components/CheckOut"));

// const WishList = lazy(() => import("./components/Wish/WishList"));
// const Basket = lazy(() => import("./components/Cart/Basket"));
// const PostPage = lazy(() => import("./components/Post/PostPage"));
// const OverView = lazy(() => import("./components/Profile/OverView"));
// const MyOrders = lazy(() => import("./components/Profile/MyOrders"));
// const Addresses = lazy(() => import("./components/Profile/Addresses"));
// const EditMyProfile = lazy(() => import("./components/Profile/EditMyProfile"));
// const Favorites = lazy(() => import("./components/Profile/Favorites"));
// const Settings = lazy(() => import("./components/Profile/Settings"));

import { FetchLoader } from "./components/SkeletonLoaders";
import { token } from "./utils/baseUrls";
import LoginModal from "./components/Helpers/LoginModal";
import { refreshToken } from "./redux/auth";
import Layout from "./components/Layout";
import Spinner from "./components/SkeletonLoaders/Spinner";
import { clientRoutes, publicRoutes } from "./routers/routes";
import Protected from "./routers/Protected";

function App() {
  const dispatch = useDispatch();
  const { isLoading, isLoginShow } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(refreshToken());
    }
  }, []);

  // useEffect(() => {
  //   window.replainSettings = { id: "9ba7af42-4b86-455f-b953-ebe0286ecce7" };
  //   (function (u) {
  //     var s = document.createElement("script");
  //     s.async = true;
  //     s.src = u;
  //     var x = document.getElementsByTagName("script")[0];
  //     x.parentNode.insertBefore(s, x);
  //   })("https://widget.replain.cc/dist/client.js");
  // }, []);
  return (
    <main>
      <Toaster position="top-left" reverseOrder={true} />
      <NetworkStatus />
      {isLoginShow && <LoginModal />}
      <Suspense fallback={<Spinner />}>
        <Routes>
          {/* <Route path="/" element={<Home />} />
          <Route path="/product/view/:slug" element={<ProductDetail />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="/category/:slug" element={<CurrentCategory />} />
          <Route path="/brand/:slug" element={<CurrentBrand />} />
          <Route path="/cart" element={<Basket />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/post/view/:id" element={<PostPage />} />
          {(token || auth.isLogged) && (
            <>
              <Route path="/profile" element={<OverView />} />
              <Route path="/profile/orders" element={<MyOrders />} />
              <Route path="/profile/addresses" element={<Addresses />} />
              <Route path="/profile/settings" element={<Settings />} />
              <Route path="/profile/update" element={<EditMyProfile />} />
              <Route path="/profile/favorites" element={<Favorites />} />
              <Route path="/check-out" element={<CheckOut />} />
            </>
          )} */}
          <Route path="*" element={<NotFound />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/check-out" element={<CheckOut />} />

          <Route element={<Layout />}>
            {publicRoutes.map(({ path, element }, index) => (
              <Route key={index} path={path} element={element} />
            ))}
            {clientRoutes.map(({ path, element }, index) => (
              <Route
                key={index}
                path={path}
                element={element}
              />
            ))}
          </Route>
        </Routes>
      </Suspense>
      {isLoading && <FetchLoader isLoading={isLoading} />}
    </main>
  );
}

export default App;
