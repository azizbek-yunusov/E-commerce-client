import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { BannerCarousel } from "../components/Banner";
import BrandsList from "../components/Brand/BrandList";
import { CategoryList } from "../components/Categories";
import MobileApp from "../components/Footer/MobileApp";
import { PostList } from "../components/Post";
import {
  BestProductsList,
  DiscountedProducts,
} from "../components/ProductItems";
import { ListBox } from "../components/TopBrand";
import { getBanners } from "../redux/banner";
import { getBrands } from "../redux/brand/brandSlice";
import { getCategories } from "../redux/category";
import { getPosts } from "../redux/post";
import { getProducts } from "../redux/product";
import { HelmetTitle } from "../utils";

const Home = () => {
  let { t } = useTranslation(["home"]);
  const { products } = useSelector((state) => state.product);
  const { banners } = useSelector((state) => state.banner);
  const { categories } = useSelector((state) => state.category);
  const { brands } = useSelector((state) => state.brand);
  const { posts } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!products.length) {
      dispatch(getProducts());
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
  }, [dispatch, products, posts, categories, brands]);

  return (
    <>
      <main>
        <HelmetTitle title={t("home")} />
        <BannerCarousel />
        <CategoryList />
        <BestProductsList />
        <DiscountedProducts />
        <BrandsList />
        <ListBox />
        <PostList />
        <MobileApp />
      </main>
    </>
  );
};

export default Home;
