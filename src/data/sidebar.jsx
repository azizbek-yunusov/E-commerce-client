import { AiOutlineSetting } from "react-icons/ai";
import { RiShoppingBag3Line } from "react-icons/ri";
import { BiHomeAlt } from "react-icons/bi";
import { MdFavoriteBorder, MdLocationOn } from "react-icons/md";

export const tabsProfileData = [
  {
    id: 0,
    path: "/profile",
    name: "overview",
    icon: <BiHomeAlt className="md:text-xl text-xl" />,
  },
  {
    id: 1,
    path: "/profile/orders",
    name: "my-orders",
    icon: <RiShoppingBag3Line className="md:text-xl text-xl" />,
  },
  {
    id: 2,
    path: "/profile/addresses",
    name: "addresses",
    icon: <MdLocationOn className="md:text-xl text-xl" />,
  },
  {
    id: 3,
    path: "/profile/favorites",
    name: "favorites",
    icon: <MdFavoriteBorder className="md:text-xl text-xl" />,
  },
  {
    id: 4,
    path: "/profile/settings",
    name: "edit-profile",
    icon: <AiOutlineSetting className="md:text-xl text-xl" />,
  },
];
