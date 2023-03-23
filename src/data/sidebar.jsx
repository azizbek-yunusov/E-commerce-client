import {
  AiOutlineHome,
  AiOutlineInbox,
  AiOutlineSetting,
  AiOutlineTeam,
  AiOutlineUser,
} from "react-icons/ai";
import { BsCardImage, BsCart2, BsUiChecksGrid } from "react-icons/bs";
import { RiShoppingBag3Line } from "react-icons/ri";
import { BiBuildingHouse, BiCategory, BiHomeAlt, BiNews } from "react-icons/bi";
import { MdFavoriteBorder, MdLocationOn } from "react-icons/md";

export const tabsProfileData = [
  {
    id: 1,
    path: "/myprofile",
    name: "overview",
    icon: <BiHomeAlt className="md:text-xl text-xl" />,
  },
  {
    id: 2,
    path: "/myprofile/orders",
    name: "my-orders",
    icon: <RiShoppingBag3Line className="md:text-xl text-xl" />,
  },
  {
    id: 3,
    path: "/myprofile/addresses",
    name: "addresses",
    icon: <MdLocationOn className="md:text-xl text-xl" />,
  },
  {
    id: 4,
    path: "/myprofile/favorites",
    name: "favorites",
    icon: <MdFavoriteBorder className="md:text-xl text-xl" />,
  },
  {
    id: 1,
    path: "/myprofile/settings",
    name: "settings",
    icon: <AiOutlineSetting className="md:text-xl text-xl" />,
  },
];

// Admin Sidebar Profile data
export const sidebarProAdmin = [
  {
    id: 2,
    path: "/dashboard/cabinet",
    name: "overview",
    icon: <BiHomeAlt className="md:text-xl text-xl" />,
  },
  {
    id: 3,
    path: "/cabinet/projects",
    name: "projects",
    icon: <BsUiChecksGrid className="md:text-xl text-xl" />,
  },
  {
    id: 4,
    path: "/cabinet/team",
    name: "team",
    icon: <AiOutlineTeam className="md:text-xl text-xl" />,
  },
  {
    id: 1,
    path: "/cabinet/settings",
    name: "settings",
    icon: <AiOutlineSetting className="md:text-xl text-xl" />,
  },
];
export const sidebarProAdminEn = [
  {
    id: 2,
    path: "/dashboard/myprofile",
    name: "Overview",
    icon: <BiHomeAlt className="md:text-xl text-xl" />,
  },
  {
    id: 3,
    path: "/myprofile/addresses",
    name: "Projects",
    icon: <BsUiChecksGrid className="md:text-xl text-xl" />,
  },
  {
    id: 4,
    path: "/myprofile/favorites",
    name: "Teams",
    icon: <AiOutlineTeam className="md:text-xl text-xl" />,
  },
  {
    id: 1,
    path: "/myprofile/settings",
    name: "Settings",
    icon: <AiOutlineSetting className="md:text-xl text-xl" />,
  },
];
export const sidebarProAdminRu = [
  {
    id: 2,
    path: "/dashboard/myprofile",
    name: "Общий",
    icon: <BiHomeAlt className="md:text-xl text-xl" />,
  },
  {
    id: 3,
    path: "/myprofile/addresses",
    name: "Manzillar",
    icon: <BsUiChecksGrid className="md:text-xl text-xl" />,
  },
  {
    id: 4,
    path: "/myprofile/favorites",
    name: "Sevimlilar",
    icon: <AiOutlineTeam className="md:text-xl text-xl" />,
  },
  {
    id: 1,
    path: "/myprofile/settings",
    name: "Sozlamalar",
    icon: <AiOutlineSetting className="md:text-xl text-xl" />,
  },
];

// Admin Sidebar data
export const sidebarAdmin = [
  {
    id: 1,
    path: "/dashboard",
    name: "overview",
    icon: <AiOutlineHome className="md:text-lg ml-4" />,
  },
  {
    id: 2,
    path: "/dashboard/products",
    name: "products",
    icon: <AiOutlineInbox className="md:text-lg ml-4" />,
  },
  {
    id: 3,
    path: "/dashboard/banners",
    name: "banners",
    icon: <BsCardImage className="md:text-lg ml-4" />,
  },
  {
    id: 4,
    path: "/dashboard/categories",
    name: "categories",
    icon: <BiCategory className="md:text-lg ml-4" />,
  },
  {
    id: 5,
    path: "/categories/category/items",
    name: "category-item",
    icon: <BiCategory className="md:text-lg ml-4" />,
  },
  {
    id: 8,
    path: "/category/item/create",
    name: "category-item-create",
    icon: <BiCategory className="md:text-lg ml-4" />,
  },
  {
    id: 6,
    path: "/dashboard/brands",
    name: "brands",
    icon: <BiBuildingHouse className="md:text-lg ml-4" />,
  },
  {
    id: 1,
    path: "/dashboard/orders",
    name: "orders",
    icon: <BsCart2 className="md:text-lg ml-4" />,
  },
  {
    id: 1,
    path: "/dashboard/posts",
    name: "posts",
    icon: <BiNews className="md:text-lg ml-4" />,
  },
  {
    id: 1,
    path: "/dashboard/users",
    name: "users",
    icon: <AiOutlineUser className="md:text-lg ml-4" />,
  },
];
export const sidebarAdminEn = [
  {
    id: 1,
    path: "/dashboard",
    name: "Overview",
    icon: <AiOutlineHome className="md:text-lg ml-4" />,
  },
  {
    id: 2,
    path: "/dashboard/products",
    name: "Products",
    icon: <AiOutlineInbox className="md:text-lg ml-4" />,
  },
  {
    id: 3,
    path: "/dashboard/banners",
    name: "Banners",
    icon: <BsCardImage className="md:text-lg ml-4" />,
  },
  {
    id: 2,
    path: "/dashboard/categories",
    name: "Categories",
    icon: <BiCategory className="md:text-lg ml-4" />,
  },
  {
    id: 2,
    path: "/dashboard/brands",
    name: "Brands",
    icon: <BiBuildingHouse className="md:text-lg ml-4" />,
  },
  {
    id: 1,
    path: "/dashboard/orders",
    name: "Orders",
    icon: <BsCart2 className="md:text-lg ml-4" />,
  },
  {
    id: 1,
    path: "/dashboard/users",
    name: "Users",
    icon: <AiOutlineUser className="md:text-lg ml-4" />,
  },
];
export const sidebarAdminRu = [
  {
    id: 1,
    path: "/dashboard",
    name: "Общий",
    icon: <AiOutlineHome className="md:text-lg ml-4" />,
  },
  {
    id: 2,
    path: "/dashboard/products",
    name: "Продукты",
    icon: <AiOutlineInbox className="md:text-lg ml-4" />,
  },
  {
    id: 3,
    path: "/dashboard/banners",
    name: "Баннеры",
    icon: <BsCardImage className="md:text-lg ml-4" />,
  },
  {
    id: 2,
    path: "/dashboard/categories",
    name: "Категории",
    icon: <BiCategory className="md:text-lg ml-4" />,
  },
  {
    id: 2,
    path: "/dashboard/brands",
    name: "Бренды",
    icon: <BiBuildingHouse className="md:text-lg ml-4" />,
  },
  {
    id: 1,
    path: "/dashboard/orders",
    name: "Заказы",
    icon: <BsCart2 className="md:text-lg ml-4" />,
  },
  {
    id: 1,
    path: "/dashboard/users",
    name: "Пользователи",
    icon: <AiOutlineUser className="md:text-lg ml-4" />,
  },
];
