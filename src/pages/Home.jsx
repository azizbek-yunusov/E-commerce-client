import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { BannerCarousel } from "../components/Banner";
import BrandsList from "../components/Brand/BrandList";
import CategoryList from "../components/Categories/CategoryList";
import { PostList } from "../components/Post";
import { ListBox } from "../components/TopBrand";
import { getBanners } from "../redux/banner";
import { getBrands } from "../redux/brand/brandSlice";
import { getCategories } from "../redux/category";
import { getPosts } from "../redux/post";
import { getDiscountProducts, getNewProducts } from "../redux/product";
import { HelmetTitle } from "../utils";
import BestProductsList from "../components/ProductItems/BestProductsList";
import NewProducts from "../components/ProductItems/NewProducts";
import DiscountProducts from "../components/ProductItems/DiscountProducts";

const Home = () => {
  let { t } = useTranslation(["home"]);
  const { products, discountProducts, newProducts } = useSelector(
    (state) => state.product
  );
  const { banners } = useSelector((state) => state.banner);
  const { categories } = useSelector((state) => state.category);
  const { brands } = useSelector((state) => state.brand);
  const { posts } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const multimpleFetch = () => {
    if (!discountProducts.length) {
      dispatch(getDiscountProducts());
    }
    if (!newProducts.length) {
      dispatch(getNewProducts());
    }
    if (!banners.length) {
      dispatch(getBanners());
    }
    if (!categories.length) {
      dispatch(getCategories());
    }
    if (!brands.length) {
      dispatch(getBrands());
    }
    if (!posts.length) {
      dispatch(getPosts());
    }
  };
  useEffect(() => {
    multimpleFetch();
  }, [products, banners, categories, brands, posts]);

  return (
    <>
      <main>
        <HelmetTitle title={t("home")} />
        <BannerCarousel />
        <CategoryList />
        <NewProducts />
        <DiscountProducts />
        <BrandsList />
        <ListBox />
        <PostList />
      </main>
    </>
  );
};

export default Home;
