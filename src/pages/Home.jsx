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
import { getProducts } from "../redux/product";
import { HelmetTitle } from "../utils";
import BestProductsList from "../components/ProductItems/BestProductsList";

const Home = () => {
  let { t } = useTranslation(["home"]);
  const { products } = useSelector((state) => state.product);
  const { banners } = useSelector((state) => state.banner);
  const { categories } = useSelector((state) => state.category);
  const { brands } = useSelector((state) => state.brand);
  const { posts } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const multimpleFetch = () => {
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
        <BestProductsList />
        <BrandsList />
        <ListBox />
        <PostList />
      </main>
    </>
  );
};

export default Home;
