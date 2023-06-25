import styled from "@emotion/styled";
import { Badge, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
import { FiShoppingCart } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart } = useSelector((state) => state.cart);
  let { t } = useTranslation(["product"]);
  const isXl = useMediaQuery("(min-width: 1245px)");

  const StyledBadge = styled(Badge)(() => ({
    "& .MuiBadge-badge": {
      right: isXl ? -3 : -2 ,
      top: 2,
      border: isXl ? `2px solid white` : "1px solid white",
      padding: isXl ? "0px 4px" : "0px 1px",
      fontWeight: 600
    },
  }));
  return (
    <Link
      to={"/cart"}
      className="flex justify-between text-gray-500 active:text-orange-400 transition_normal flex-col items-center"
    >
      <StyledBadge
        showZero
        badgeContent={cart ? cart.length : 0}
        color="warning"
      >
        <FiShoppingCart className="md:text-xl xl:text-2xl text-2xl cursor-pointer text-gray-500" />
      </StyledBadge>
      <p className="text-xs pt-1 sm:text-sm">{t("cart")}</p>
    </Link>
  );
};

export default Cart;
