import { Link } from "react-router-dom";

const BannerItem = ({ image, redirect }) => {
  return (
    <div className="w-full overflow-hidden flex justify-start items-center">
      <Link to={redirect}>
        <img
          src={image.url}
          alt={"image"}
          className="w-full bg-center object-cover lg:h-[385px] md:h-[248px] h-[135px] rounded-xl bg-gray-200"
        />
      </Link>
    </div>
  );
};

export default BannerItem;
