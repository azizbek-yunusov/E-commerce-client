import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const CategoryItem = ({ nameOz, nameUz, nameRu, slug, image }) => {
  const { i18n } = useTranslation();

  return (
    <Link
      to={`/category/${slug.trim()}`}
      className="cursor-pointer flex flex-col items-center"
    >
      <div className="p-3 md:p-2 md:px-4 px-3 md:rounded-xl rounded-xl bg-gradient-to-r from-violet-400 to-fuchsia-400 mb-2">
        <img
          className="md:h-32 md:w-32 h-20 w-20 object-cover"
          src={image.url}
          alt=""
        />
      </div>
      <p className="text-zinc-800 lg:text-base text-center text-xs tranistion_normal hover:text-red-600">
        {i18n.language === "oz"
          ? nameOz
          : i18n.language === "uz"
          ? nameUz
          : i18n.language === "ru"
          ? nameRu
          : null}
      </p>
    </Link>
  );
};

export default CategoryItem;
