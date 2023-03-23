import React from "react";
import { BiMenu } from "react-icons/bi";

const Menu = () => {
  return (
    <div className="lg:hidden flex flex_center bg_secondary p-1.5 rounded-lg">
      <BiMenu className="text-2xl text-white" />
    </div>
  );
};

export default Menu;
