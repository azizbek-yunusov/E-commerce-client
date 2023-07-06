import { Suspense, lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import NetworkStatus from "./components/Helpers/NetworkStatus";
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const NotFound = lazy(() => import("./pages/NotFound"));
const CheckOut = lazy(() => import("./pages/CheckOut"));
import { FetchLoader } from "./components/SkeletonLoaders";
import { token } from "./utils/baseUrls";
import { refreshToken } from "./redux/auth";
import Layout from "./components/Layout";
import { clientRoutes, publicRoutes } from "./routers/routes";
import { AuthModal } from "./components/Auth";
import LazyLoader from "./components/Helpers/LazyLoader";

function App() {
  const dispatch = useDispatch();
  const { isLoading, isLoginShow } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(refreshToken());
    }
  }, [token]);

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
      {isLoginShow && <AuthModal />}
      <Suspense fallback={<LazyLoader />}>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/check-out" element={<CheckOut />} />
          <Route element={<Layout />}>
            {publicRoutes.map(({ path, element }, index) => (
              <Route key={index} path={path} element={element} />
            ))}
            {clientRoutes.map(({ path, element }, index) => (
              <Route key={index} path={path} element={element} />
            ))}
          </Route>
        </Routes>
      </Suspense>
      {isLoading && <FetchLoader isLoading={isLoading} />}
    </main>
  );
}

export default App;
