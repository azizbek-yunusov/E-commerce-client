import { useScrollTrigger } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { AuthButton, HomeButton, UserButton } from "../Buttons";
import { Cart } from "../Cart";
import { FavoritesButton } from "../Wish";

const BottomNavigation = () => {
  const { isLogged } = useSelector((state) => state.auth);
  const scroll = useScrollTrigger();
  return (
    <div>
      {!scroll ? (
        <div className="lg:hidden block w-full rounded-t-3xl z-50 border-t border-gray-100 bg-white backdrop-blur-md fixed left-0 bottom-0 shadow-xl">
          <div className="flex_betwen px-7 py-[6px] pt-3 sm:py-4  text-gray-700">
            <HomeButton />
            <FavoritesButton />
            <Cart />
            {isLogged ? <AuthButton /> : <UserButton />}
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default BottomNavigation;
