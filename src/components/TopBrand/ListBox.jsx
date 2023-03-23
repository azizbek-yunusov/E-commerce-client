import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdaptableCard from "./AdaptableCard";
import WatchingVideoCard from "./WatchingVideoCard";

const ListBox = () => {
  const [products, setProducts] = useState([]);
  const fetchData = async () => {
    const { data } = await axios.get("/products");
    setProducts(data.products);
  };

  // useEffect(() => {
  //   fetchData();
  // }, []);
  return (
    <div className="bg-[#f2f2f2] my-8 pt-8 pb-5 hidden">
      <div className="container-full md:my-5">
        <div className="flex_betwen md:mb-5">
          <h1 className="lg:text-3xl text-2xl text-gray-800 text-left font-semibold">
            Apple Texnikasi
          </h1>
          <Link
            to={"/manufacturer"}
            className="text-lg hover:underline transition_normal text-orange-500"
          >
            Barchasini ko'rish
          </Link>
        </div>
        <div className="grid grid-cols-12 md:gap-x-5">
          <div className="col-span-3 md:mx-2">
            {/* {products.slice(0, 2).map((item, index) => (
              <AdaptableCard key={index} index={index} {...item} />
            ))} */}
          </div>
          <div className="col-span-9">
            <div className="flex_betwen md:mx-2">
              <WatchingVideoCard />
              <WatchingVideoCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListBox;
