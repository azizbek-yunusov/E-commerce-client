import { ProductList } from '../SkeletonLoaders';
import ProductCard from './ProductCard';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const NewProducts = () => {
  const { t } = useTranslation(["product"]);
  const { isLoading, newProducts } = useSelector((state) => state.product);
  return (
    <section>
      {!isLoading ? (
        <section className="container-full md:my-5">
          {newProducts.length ? (
            <div className="">
              <div className="flex_betwen md:mb-8 mb-5">
                <h1 className="lg:text-3xl text-xl font-semibold text-zinc-800">
                  {t("new-products")}
                </h1>
                {/* <Link
                  className="text-orange-600 md:text-lg text-xs font-semibold"
                  to={"/products"}
                >
                  {t("all-views")}
                </Link> */}
              </div>
              <div className="">
                <div className="col-span-12 grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 lg:gap-4 grid-cols-2 sm:gap-3 gap-2 relative">
                  {newProducts.map((item) => (
                    <ProductCard key={item._id} {...item} />
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </section>
      ) : (
        <ProductList />
      )}
    </section>
  );
}

export default NewProducts