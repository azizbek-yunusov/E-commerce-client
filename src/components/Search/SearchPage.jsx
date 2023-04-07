import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BsGrid, BsViewStacked } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getBrands } from "../../redux/brand/brandSlice";
import { getCategories } from "../../redux/category";
import { HelmetTitle } from "../../utils";
import ListProductCard from "../ProductItems/ListProductCard";
import ProductCard from "../ProductItems/ProductCard";
import { SearchPageLoader } from "../SkeletonLoaders";
import Filter from "./Filter";
import { productUrl } from "../../utils/baseUrls";

const SearchPage = () => {
  const { categories } = useSelector((state) => state.category);
  const { brands } = useSelector((state) => state.brand);
  const dispatch = useDispatch();
  let { t } = useTranslation(["product"]);
  const navigate = useNavigate();
  const { search } = useLocation();
  const [loading, setLoading] = useState(true);
  const sp = new URLSearchParams(search); // /search?category=Shirts
  const category = sp.get("category") || "all";
  const brand = sp.get("brand") || "all";
  const query = sp.get("query") || "all";
  const price = sp.get("price") || "all";
  const rating = sp.get("rating") || "all";
  const order = sp.get("order") || "newest";
  const page = sp.get("page") || 1;
  const [result, setResult] = useState([]);
  const [isList, setIsList] = useState(false);

  const getFilterUrl = (filter, skipPathname) => {
    const filterPage = filter.page || page;
    const filterCategory = filter.category || category;

    const filterBrand = filter.brand || brand;
    const filterQuery = filter.query || query;
    const filterRating = filter.rating || rating;
    const filterPrice = filter.price || price;
    const sortOrder = filter.order || order;
    return `${
      skipPathname ? "" : "/search?"
    }category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&brand=${filterBrand}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}`;
  };
  console.log(query);
  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `${productUrl}products/search?page=${page}&query=${query}&category=${category}&price=${price}&brand=${brand}&rating=${rating}&order=${order}`
      );
      console.log(data);
      setResult(data.products);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBrands());
    window.scrollTo(0, 0);
  }, [dispatch]);
  console.log(result);

  return (
    <>
      <HelmetTitle title={`${query} - ${t("search-filter")}`} />
      {loading ? (
        <SearchPageLoader />
      ) : (
        <div className="container-full md:my-5 my-3">
          {result.length ? (
            <h1 className="md:text-[26px] md:mb-6 mb-5 font-semibold text-gray-700">
              <span className="text-orange-500">"{query}"</span>{" "}
              {t("search-succ")}
            </h1>
          ) : (
            <h1 className="md:text-[26px] md:mb-6 mb-5 font-semibold text-gray-700">
              <span className="text-orange-500">"{query}"</span>{" "}
              {t("search-reject")}
            </h1>
          )}
          {result.length ? (
            <div className="grid grid-cols-12 xl:gap-x-5 md:gap-x-3">
              <div className="md:col-span-3 lg:block hidden xl:px-2 overflow-y-scroll max-h-[500px]">
                <Filter
                  categories={categories}
                  brands={brands}
                  getFilterUrl={getFilterUrl}
                  category={category}
                />
              </div>
              <div className="md:col-span-9 col-span-12">
                <div className="flex_betwen md:mb-6 mb-4">
                  <div className="">
                    <FormControl
                      color="secondary"
                      size="small"
                      sx={{ minWidth: "150px" }}
                    >
                      <InputLabel _id="demo-simple-select-label">
                        {t("sorting")}
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        _id="demo-simple-select"
                        MenuProps={{
                          disableScrollLock: true,
                        }}
                        value={"all"}
                        // onChange={(e) => setCategory(e.target.value)}
                        label={t("sorting")}
                      >
                        <MenuItem value={"all"}>All</MenuItem>
                        <MenuItem value={"user"}>products</MenuItem>
                        <MenuItem value={"admin"}>Admins</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="flex_betwen">
                    <div className="">
                      <div className="ml-3 rounded-lg">
                        <IconButton
                          onClick={() => setIsList(false)}
                          aria-label="Table"
                          color={!isList ? "secondary" : "default"}
                        >
                          <BsGrid className="text-xl" />
                        </IconButton>
                        <IconButton
                          onClick={() => setIsList(true)}
                          aria-label="Table"
                          color={isList ? "secondary" : "default"}
                        >
                          <BsViewStacked className="text-xl" />
                        </IconButton>
                      </div>
                    </div>
                  </div>
                </div>
                {result.length ? (
                  <>
                    {!isList ? (
                      <div className="grid lg:grid-cols-3 xl:grid-cols-4 grid-cols-2 md:gap-4 gap-1">
                        {result.map((item, index) => (
                          <ProductCard key={index} {...item} />
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        {result.map((item, index) => (
                          <ListProductCard key={index} {...item} />
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex_center w-full flex-col">
                    <img
                      src="/images/search.png"
                      className="h-60 md:mb-5"
                      alt=""
                    />
                    <h1 className="md:text-2xl text-gray-700 font-semibold mb-2">
                      {t("search-rejected")}
                    </h1>
                    <p className=" text-gray-500 md:px-80 text-center">
                      {t("search-rejected-d")}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex_center w-full min-h-[480px] md:mt-0 -mt-10">
              <div className="md:max-w-sm max-w-full flex_center w-full flex-col">
                <img
                  src="/images/search.png"
                  className="md:h-60 h-56 md:mb-5"
                  alt=""
                />
                <h1 className="md:text-2xl text-xl text-gray-700 font-semibold mb-2">
                  {t("search-rejected")}
                </h1>
                <p className=" text-zinc-500 text-center mb-5">
                  {t("search-rejected-d")}
                </p>
                <Button
                  onClick={() => navigate("/")}
                  variant="contained"
                  color="secondary"
                >
                  {t("go-home")}
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SearchPage;
