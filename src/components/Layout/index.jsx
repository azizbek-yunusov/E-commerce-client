import { BottomNavigation, Navbar, TopLink } from "../Header";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";

const Layout = () => {
  return (
    <>
      <TopLink />
      <Navbar />
      <Outlet />
      <Footer />
      <BottomNavigation />
    </>
  );
};

export default Layout;
