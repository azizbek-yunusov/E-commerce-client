import React from "react";

const Logo = ({ className }) => {
  return (
    <div className="flex items-center">
      <img
        src="/images/Xurmo_logo.png"
        className="md:h-8 h-7 object-cover"
        alt="logo"
      />
      <h1 className={`${className} text-orange-500 ml-1 md:text-3xl text-2xl font-semibold`}>Xurmo</h1>
    </div>
  );
};

export default Logo;
