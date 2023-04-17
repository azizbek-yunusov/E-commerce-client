import React from "react";

const Logo = ({ className }) => {
  return (
    <div className="flex items-center">
      <img
        src="/images/Xurmo_logo.png"
        className="h-8 object-cover"
        alt="logo"
      />
      <h1 className={`${className} text-orange-500 md:ml-1 text-3xl font-semibold`}>Xurmo</h1>
    </div>
  );
};

export default Logo;
