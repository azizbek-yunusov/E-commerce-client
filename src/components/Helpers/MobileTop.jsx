import React from "react";
import GoBack from "./GoBack";

const MobileTop = ({ name, items, list,  }) => {
  return (
    <div className="container-full flex_betwen md:hidden my-2">
      <GoBack />
      <h1 className="text-xl text-gray-600 font-semibold">{name}</h1>
      <h1 className="text-gray-500">{items}{" "}{list?.length}</h1>
    </div>
  );
};

export default MobileTop;
