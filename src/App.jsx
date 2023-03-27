import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import viteLogo from "/vite.svg";
import "./App.css";
import NetworkStatus from "./components/Helpers/NetworkStatus";
import { ActivationEmail, Home, NotFound, SignIn, SignUp } from "./pages";
import { ProductDetail, ProductsList } from "./components/ProductItems";
import { CurrentCategory } from "./components/Categories";
import { CurrentBrand } from "./components/Brand";
import SearchPage from "./components/Search/SearchPage";
import { WishList } from "./components/Wish";
import { Basket } from "./components/Cart";
import { PostPage } from "./components/Post";
import { BottomNavigation, Navbar, TopLink } from "./components/Header";
import Footer from "./components/Footer";
import OverView from "./components/Profile/OverView";
import MyOrders from "./components/Profile/MyOrders";
import Addresses from "./components/Profile/Addresses";
import { EditMyProfile, Favorites, Settings } from "./components/Profile";
import CheckOut from "./components/CheckOut";
import { refreshToken } from "./redux/actions/authAction";
import { FetchLoader } from "./components/SkeletonLoaders";

function App() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigete = useNavigate();
  const { auth } = useSelector((state) => state);
  useEffect(() => {
    dispatch(refreshToken());
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
      <>
        <Toaster position="top-left" reverseOrder={true} />
        <NetworkStatus />

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

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/view/:id" element={<ProductDetail />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="/category/:id" element={<CurrentCategory />} />
          <Route path="/brand/:slug" element={<CurrentBrand />} />
          <Route path="/cart" element={<Basket />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/post/view/:id" element={<PostPage />} />
          {auth.isLogged && (
            <>
              <Route path="/myprofile" element={<OverView />} />
              <Route path="/myprofile/orders" element={<MyOrders />} />
              <Route path="/myprofile/addresses" element={<Addresses />} />
              <Route path="/myprofile/settings" element={<Settings />} />
              <Route path="/myprofile/update" element={<EditMyProfile />} />
              <Route path="/myprofile/favorites" element={<Favorites />} />
              <Route path="/check-out" element={<CheckOut />} />
            </>
          )}
          <Route
            path="/user/activate/:activationtoken"
            element={<ActivationEmail />}
          />
          <Route path="*" element={<NotFound />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
        {auth.isLoading && <FetchLoader isLoading={auth.isLoading} />}

        {pathname === "/signup" || pathname === "/signin" ? null : <Footer />}
      </>
    </main>
  );
}

export default App;
