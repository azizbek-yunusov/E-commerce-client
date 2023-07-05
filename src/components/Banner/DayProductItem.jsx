import Price from "../Helpers/Price";
import { discPriceCalc } from "../../utils/discountPriceCalc";

const DayProductItem = ({
  name,
  discount,
  images,
  price,
}) => {
  return (
    <div className="overflow-hidden md:pt-0 pt-2 bg-white lg:px-3 px-2 rounded-b-lg flex lg:flex-col flex-row md:items-center items-start lg:h-[300px] md:h-[170px] h-[140px]">
      <img
        src={images[0].url}
        className="md:h-40 h-28 object-cover"
        alt={name}
      />
      {discount > 0 && (
        <div className="md:px-2 p-[2px] px-1 md:py-1 absolute top-1 left-2 md:text-sm text-xs font-semibold md:rounded-lg rounded bg-red-600 text-white">
          -{discount}
          {"%"}
        </div>
      )}
      <div className="w-full">
        <div className="w-full mt-2">
          <p className="md:text-base rounded-sm text-sm text-zinc-800">{name}</p>
        </div>
        <div className="w-full flex justify-between md:mt-1 mt-2">
          {discount > 0 ? (
            <div className="">
              <Price
                price={discPriceCalc(price, discount)}
                className="md:text-xl font-semibold"
              />
              <Price
                price={price}
                className="md:text-lg line-through text-gray-400"
              />
            </div>
          ) : (
            <Price price={price} className="md:text-xl font-semibold" />
          )}
        </div>
      </div>
    </div>
  );
};

export default DayProductItem;
