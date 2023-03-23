import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { SearchBox } from "../Search";
import { FavoritesButton } from "../Wish";
import { Cart } from "../Cart";
import { AuthButton, CatalogButton, Menu, UserButton } from "../Buttons";
import Logo from "../Helpers/Logo";
function useIsScrollTop() {
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    function onScroll() {
      setIsTop(window.scrollY <= 0);
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return isTop;
}
const Navbar = () => {
  const { isLogged, isAdmin } = useSelector((state) => state.auth);
  const isTop = useIsScrollTop();
  return (
    <>
      {isLogged && isAdmin ? null : (
        <>
          <div
            className={`bg-white lg:block hidden w-full tranistion_normal ${
              isTop
                ? ""
                : "md:sticky top-0 w-full z-50 border-b md:drop-shadow-md  shadow-sm border-b-gray-300"
            }`}
          >
            <div className="container-full  grid lg:grid-cols-12 md:pb-2 md:pt-[14px] py-1">
              <div className="col-span-3  flex justify-between items-center">
                <Link
                  to="/"
                  className="text-gray-700 lg:block hidden md:text-[26px] text-xl font-bold global-font"
                >
                  <Logo />
                </Link>
                <CatalogButton />
              </div>
              <div className="lg:col-span-6  col-span-9 flex justify-end items-center">
                <SearchBox />
              </div>
              <div className="hidden  lg:col-span-3 lg:flex justify-end items-center">
                <ul className="flex justify-between items-center my-1">
                  <li className="lg:mr-3 xl:mr-6">
                    <FavoritesButton />
                  </li>
                  <li className="md:mx-1 xl:mx-6">
                    <Cart />
                  </li>
                  <li className="xl:ml-4 md:ml-1 ml-3 -mt-1">
                    {isLogged ? <AuthButton /> : <UserButton />}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            className={`bg-white lg:hidden border-b border-b-transparent ${
              isTop
                ? ""
                : "sticky top-0 w-full z-50 shadow-md border-b-gray-300"
            }`}
          >
            <div className="container-full flex_betwen py-2">
              <Menu />
              <div className="w-full ml-3">
                <SearchBox />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default Navbar;
