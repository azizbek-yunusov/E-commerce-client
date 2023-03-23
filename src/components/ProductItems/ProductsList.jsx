import { Breadcrumbs } from "@mui/material";
import { useDispatch } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";
import { HelmetTitle } from "../../utils";

const ProductsList = () => {
  const dispatch = useDispatch();

  return (
    <>
      <HelmetTitle title={"Eng yaxshi mahsulotlar"} />
      <div className="container-full md:my-5 min-h-[500px]">
        <Breadcrumbs fullWidth>
          <Link to={"/"} className="">
            Home
          </Link>
          <Link to={"/"} className="">
            Best products
          </Link>
        </Breadcrumbs>
        <h1 className="md:text-2xl text-gray-800 font-semibold md:my-5 border-b border-b-gray-200 md:pb-5">
          Eng ommabop mahsulotlar
        </h1>
        <div className="grid grid-cols-12 gap-x-5">
          <div className="col-span-3 border-r border-r-gray-300 bg-red-300"></div>
          <div className="col-span-9 bg-green-300">s</div>
        </div>
      </div>
    </>
  );
};

export default ProductsList;
