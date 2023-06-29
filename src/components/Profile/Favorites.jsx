import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { HelmetTitle } from "../../utils";
import WishProductItem from "../Wish/WishProductItem";

const Favorites = () => {
  const { favorites } = useSelector((state) => state.favorite);
  const { t } = useTranslation();

  return (
    <div>
      <HelmetTitle
        title={`${t("user:favorites")} - ${t("user:personal")}`}
      />

      <div className="">
        {favorites.length ? (
          <div className="grid lg:grid-cols-3 grid-cols-2 md:gap-4 gap-1">
            {favorites.map((item, index) => (
              <WishProductItem key={index} {...item} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center flex-col">
            <img src="/images/wish.png" className="h-52" alt="" />
            <h1 className="text-2xl text-gray-800 font-semibold md:mb-5">
              {t("product:empty-wish")}
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
