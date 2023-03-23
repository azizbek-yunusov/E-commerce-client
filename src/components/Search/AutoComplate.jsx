import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const AutoComplate = ({ filteredData, clearFilter, query }) => {
  let { t } = useTranslation(["product"]);

  return (
    <>
      {filteredData.length !== 0 && (
        <>
          <div className="absolute left-0 top-11 bg-white xl:w-[600px] lg:w-[500px] w-full mt-[2px] rounded-lg shadow-md text-left overflow-hidden z-20 max-h-96 ">
            <Link
              to={`/product/`}
              onClick={clearFilter}
              className="cursor-pointer py-2 w-full px-5 hover:bg-gray-100 flex items-center"
            >
              <p className="ml-5">"{query}" {t("search")} </p>
            </Link>
            {filteredData.slice(0, 20).map((value, key) => {
              return (
                <Link
                  to={`/product/view/${value._id}`}
                  onClick={clearFilter}
                  className="cursor-pointer py-2 w-full px-5 hover:bg-gray-100 flex items-center"
                  key={key}
                >
                  <img
                    src={value.images[0].url}
                    alt={value.name}
                    width="40"
                    height="40"
                  />
                  <p className="ml-5">{value.name}</p>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default AutoComplate;
