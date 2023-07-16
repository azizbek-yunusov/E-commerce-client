import { CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";

const LazyLoader = () => {
  const { t } = useTranslation(["home"]);
  return (
    <div className="flex_center min-h-screen w-full z-50">
      <div className="text-center">
        <CircularProgress color="primary" />
        <h1 className="text_color text-2xl font-semibold my-3">{t("loading")}</h1>
      </div>
    </div>
  );
};

export default LazyLoader;
