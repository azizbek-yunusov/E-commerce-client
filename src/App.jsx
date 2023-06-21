import { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import "./App.css";
import NetworkStatus from "./components/Helpers/NetworkStatus";
const Home = lazy(() => import("./pages/Home"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ProductDetail = lazy(() =>
  import("./components/ProductItems/ProductDetail")
);
const ProductsList = lazy(() =>
  import("./components/ProductItems/ProductsList")
);
const CurrentCategory = lazy(() => import("./components/Categories/CurrentCategory"));
const CurrentBrand = lazy(() => import("./components/Brand/CurrentBrand"));
const SearchPage = lazy(() => import("./components/Search/SearchPage"));
const WishList = lazy(() => import("./components/Wish/WishList"));
const Basket = lazy(() => import("./components/Cart/Basket"));
const PostPage = lazy(() => import("./components/Post/PostPage"));
const OverView = lazy(() => import("./components/Profile/OverView"));
const MyOrders = lazy(() => import("./components/Profile/MyOrders"));
const Addresses = lazy(() => import("./components/Profile/Addresses"));
const CheckOut = lazy(() => import("./components/CheckOut"));
const EditMyProfile = lazy(() => import("./components/Profile/EditMyProfile"));
const Favorites = lazy(() => import("./components/Profile/Favorites"));
const Settings = lazy(() => import("./components/Profile/Settings"));

import Footer from "./components/Footer";
import { BottomNavigation, Navbar, TopLink } from "./components/Header";
import { FetchLoader } from "./components/SkeletonLoaders";
import { token } from "./utils/baseUrls";
import LoginModal from "./components/Helpers/LoginModal";
import { refreshToken } from "./redux/auth";

function App() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  useEffect(() => {
    if (token) {
      dispatch(refreshToken());
    }
  }, [dispatch]);

  useEffect(() => {
    window.replainSettings = { id: "9ba7af42-4b86-455f-b953-ebe0286ecce7" };
    (function (u) {
      var s = document.createElement("script");
      s.async = true;
      s.src = u;
      var x = document.getElementsByTagName("script")[0];
      x.parentNode.insertBefore(s, x);
    })("https://widget.replain.cc/dist/client.js");
  }, []);
  return (
    <main>
      <Toaster position="top-left" reverseOrder={true} />
      <NetworkStatus />
      {auth.isLoginShow && <LoginModal />}

      {pathname === "/signup" ||
      pathname === "/signin" ||
      pathname === "/user/activate/:activationtoken" ||
      pathname === "/check-out" ? null : (
        <>
          <TopLink />
          <Navbar />
          <BottomNavigation />
        </>
      )}
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route path="/" element={<Home />} />
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
          )}
          <Route path="*" element={<NotFound />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </Suspense>
      {auth.isLoading && <FetchLoader isLoading={auth.isLoading} />}

      {pathname === "/signup" || pathname === "/signin" ? null : <Footer />}
    </main>
  );
}

export default App;
