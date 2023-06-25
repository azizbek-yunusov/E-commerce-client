import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import LayoutP from "../components/Profile/LayoutP";
import { HelmetTitle } from "../utils";
import OrdersList from "../components/MyOrders/OrdersList";
import { getMyOrders } from "../redux/order";

const Orders = () => {
  let { t } = useTranslation(["order"]);
  const dispatch = useDispatch();
  const { access_token } = useSelector((state) => state.auth);
  const { isLoading, myOrders } = useSelector((state) => state.order);
  const [sort, setSort] = useState("");

  useEffect(() => {
    if (access_token) {
      dispatch(getMyOrders(access_token));
    }
  }, [access_token, dispatch]);
  return (
    <LayoutP>
      <HelmetTitle title={`${t("user:my-orders")} - ${t("user:personal")}`} />
      <div className="flex justify-between items-center ">
        <h1 className="md:text-xl font-semibold">{t("all-orders")}</h1>
        <FormControl color="secondary" size="small" sx={{ minWidth: "150px" }}>
          <InputLabel _id="demo-simple-select-label">{t("sorting")}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            _id="demo-simple-select"
            MenuProps={{
              disableScrollLock: true,
            }}
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            label={t("sorting")}
          >
            <MenuItem value={""}>{t("all")}</MenuItem>
            <MenuItem value={"Unpaid"}>{t("un-paid")}</MenuItem>
            <MenuItem value={"status"}>{t("active")}</MenuItem>
          </Select>
        </FormControl>
      </div>
      {!isLoading ? (
        <div className="">
          {myOrders?.length ? (
            <OrdersList orders={myOrders} />
          ) : (
            <div className="flex flex-col items-center justify-center">
              <img src="/images/order.png" alt="cart" className="h-56" />
              <h1 className="text-2xl font-semibold text-gray-700">
                {t("empty-order")}
              </h1>
            </div>
          )}
        </div>
      ) : (
        <CircularProgress color="secondary" />
      )}
    </LayoutP>
  );
};

export default Orders;
