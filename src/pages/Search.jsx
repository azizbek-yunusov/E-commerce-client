import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BsGrid, BsViewStacked } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getCategories } from "../redux/category";
import { getBrands } from "../redux/brand/brandSlice";
import { HelmetTitle } from "../utils";
import SearchPageLoader from "../components/SkeletonLoaders/SearchPageLoader";
import ProductCard from "../components/ProductItems/ProductCard";
import ListProductCard from "../components/ProductItems/ListProductCard";
import Filter from "../components/Search/Filter";
import { getSearchProducts } from "../redux/filter";

const Search = () => {
  const { categories } = useSelector((state) => state.category);
  const { brands } = useSelector((state) => state.brand);
  const { products, isLoading, perPage, count, rangePrice } = useSelector(
    (state) => state.filter
  );
  const dispatch = useDispatch();
  let { t } = useTranslation(["product"]);
  const navigate = useNavigate();
  const { search } = useLocation();

  const [loading, setLoading] = useState(true);
  const sp = new URLSearchParams(search); // /search?category=Shirts
  const query = sp.get("query");
  const category = sp.get("category");
  const minPrice = sp.get("min-price") || 0;
  const maxPrice = sp.get("max-price") || 20000000;

  const [price, setPrice] = useState([rangePrice[0] || minPrice || 0, rangePrice[1] || maxPrice || 20000000]);


  // const brand = sp.get("brand");

  // const rating = sp.get("rating");
  // const order = sp.get("order") || "newest";
  // const page = sp.get("page") || 1;
  const [isList, setIsList] = useState(false);

  const getFilterUrl = (filter, skipPathname) => {};
  const existCategories = categories?.filter((item2) => {
    return products?.some((item1) => item1.category === item2._id);
  });
  const existBrands = brands?.filter((item2) => {
    return products?.some((item1) => item1.brand === item2._id);
  });
  useEffect(() => {
    dispatch(getSearchProducts({ query, price }));
    setLoading(false);
  }, [dispatch, query, price]);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBrands());

    window.scrollTo(0, 0);
  }, [dispatch]);

  console.log("price", price, "range:", minPrice);

  return (
    <>
      <HelmetTitle title={`${query} - ${t("search-filter")}`} />
      {isLoading ? (
        <SearchPageLoader />
      ) : (
        <div className="container-full md:my-5 my-3">
          {products.length ? (
            <h1 className="md:text-[26px] md:mb-6 mb-5 font-semibold text-gray-700">
              <span className="text-orange-500">&quot;{query}&quot;</span>{" "}
              {t("search-succ")}
            </h1>
          ) : (
            <h1 className="md:text-[26px] md:mb-6 mb-5 font-semibold text-gray-700">
              <span className="text-orange-500">&quot;{query}&quot;</span>{" "}
              {t("search-reject")}
            </h1>
          )}
          {products.length ? (
            <div className="sticky top-5 grid grid-cols-12 xl:gap-x-5 md:gap-x-3">
              <div className="md:col-span-3 lg:block hidden xl:px-2">
                {!isLoading && (
                  <Filter
                    categories={existCategories}
                    brands={existBrands}
                    getFilterUrl={getFilterUrl}
                    category={category}
                    price={price}
                    setPrice={setPrice}
                  />
                )}
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
                        value={"best"}
                        // onChange={(e) => setCategory(e.target.value)}
                        label={t("sorting")}
                      >
                        <MenuItem value={"best"}>Ommabop</MenuItem>
                        <MenuItem value={"all"}>Narxi arzon</MenuItem>
                        <MenuItem value={"all"}>Narxi qimmat</MenuItem>
                        <MenuItem value={"user"}>Reyting baland</MenuItem>
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
                {products.length ? (
                  <div className="flex_col items-center">
                    {!isList ? (
                      <div className="grid lg:grid-cols-3 xl:grid-cols-4 grid-cols-2 md:gap-4 gap-1">
                        {products.map((item, index) => (
                          <ProductCard key={index} {...item} />
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        {products.map((item, index) => (
                          <ListProductCard key={index} {...item} />
                        ))}
                      </div>
                    )}
                    <Pagination
                      count={count / perPage}
                      color="secondary"
                      sx={{ marginTop: 5 }}
                    />
                  </div>
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

export default Search;
