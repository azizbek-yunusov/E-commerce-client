import {
  Breadcrumbs,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Radio,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import Payme from "../../assets/svg/payme.svg";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
import Top from "./Top";
import address from "../../data/address.json";
import Price from "../Helpers/Price";
import {
  deliveryTypeData,
  paymentMethodData,
} from "../../data/OrderTypeData";
import { newOrder } from "../../redux/order";
import { HelmetTitle } from "../../utils";

const CheckOut = () => {
  const { t } = useTranslation(["order"]);
  const disptach = useDispatch();
  const { isLoading, isError } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.me);
  const { cart } = useSelector((state) => state.cart);
  const { access_token } = useSelector((state) => state.auth);
  const { standart } = useSelector((state) => state.address);
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [region, setRegion] = useState("Toshkent Viloyati");
  const [district, setDistrict] = useState("");
  const [street, setStreet] = useState("");
  const [house, setHouse] = useState("");
  const [payment, setPayment] = useState("Cash on Delivery");
  const [delivery, setDelivery] = useState("Delivery address");
  const [selectDistricts, setSelectDistricts] = useState([]);
  const navigate = useNavigate();

  const handlePaymentChange = (e) => {
    setPayment(e.target.value);
    if (payment !== "Cash on Delivery") {
      toast.error("payment-not-status");
    }
  };
  const handleDeliveryChange = (e) => {
    setDelivery(e.target.value);
    if (payment !== "Delivery address") {
      toast.error("delivery-not-status");
    }
  };
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setLastName(user.lastName || "");
      setEmail(user.email || "");
      setContact(user.phoneNumber || "");
    }
    if (standart) {
      setRegion(standart.region || "");
      setDistrict(standart.district || "");
      setStreet(standart.street || "");
      setHouse(standart.house || "");
    }
    window.scrollTo(0, 0);

  }, [user, standart]);
  // address
  const findStandartRegionId = address.regions.filter((rg) => {
    return rg.name === region;
  });
  const defaultDistricts = address.districts.filter((value) => {
    return value.region_id === findStandartRegionId[0]?.id || 11;
  });
  const handleRegion = (e) => {
    const getRegionId = e.target.value;
    const getRegionData = address?.regions.find(
      (reg) => reg.id === getRegionId
    );
    console.log(getRegionId);
    const getDistrictsdata = address.districts.filter(
      (item) => item.region_id === getRegionId
    );
    setRegion(getRegionData.name);
    setSelectDistricts(getDistrictsdata);
  };
  const totalPrice =
    cart.length &&
    cart?.reduce((a, c) => a + c.productId.price * c.quantity, 0);
  const totalQuantity =
    cart.length && cart?.reduce((a, c) => a + c.quantity, 0);
  const newOrderHandle = async (e) => {
    try {
      e.preventDefault();
      const orderData = {
        shippingAddress: {
          region: region,
          district: district,
          street: street,
          house: house,
        },
        firstName: name,
        lastName: lastname,
        email: email,
        contact: contact,
        paymentMethod: payment,
        deliveryType: delivery,
        totalPrice,
        orderStatus: "Accepted",
      };
      await disptach(newOrder({ access_token, orderData }));
      if (!isLoading) {
        toast.success(t("new-order-added"));
        navigate("/myprofile/orders");
      }
      if (isError) {
        toast.error("Something Went Wrong!");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <HelmetTitle title={t("check-out")} />
      <div className="min-h-screen md:mb-14">
        <Top />
        <div className="container-full block my-5 xl:px-20">
          <div className="flex items-center justify-between md:pb-5 pb-2 md:mb-3 mb-2 border-b border-b-gray-300">
            <h1 className="md:text-2xl text-xl font-semibold text-gray-800">
              {t("check-out")}
            </h1>
            <Breadcrumbs>
              <Link to={"/"} className="">
                {t("home")}
              </Link>
              <Link to={"/check-out"} className="">
                {t("check-out")}
              </Link>
            </Breadcrumbs>
          </div>

          <form onSubmit={newOrderHandle}>
            <div className="grid md:grid-cols-3 grid-cols-1 md:my-5 my-3">
              <div className="md:col-span-2 xl:mr-20 lg:mr-8 md:mr-3">
                <div className="md:mb-9 mb-4">
                  <div className="flex items-center mb-8">
                    <span className="flex_center md:w-[30px] md:h-[30px] w-6 h-6 bg-zinc-800 rounded-full md:text-lg text-sm text-white">
                      1
                    </span>
                    <h1 className="md:text-lg font-semibold ml-3">
                      {" "}
                      {t("client-info")}
                    </h1>
                  </div>
                  <div className="my-6 grid md:grid-cols-2 grid-cols-1 gap-5">
                    <TextField
                      id="outlined-basic"
                      fullWidth
                      variant="outlined"
                      color="secondary"
                      className="rounded-xl"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      label={t("name")}
                    />
                    <TextField
                      id="outlined-basic"
                      fullWidth
                      variant="outlined"
                      color="secondary"
                      className="rounded-xl"
                      value={lastname}
                      onChange={(e) => setLastName(e.target.value)}
                      label={t("last-name")}
                    />
                    <TextField
                      id="outlined-basic"
                      fullWidth
                      variant="outlined"
                      label={t("email")}
                      type="email"
                      color="secondary"
                      value={email}
                      className="rounded-xl"
                      onChange={(e) => setEmail(e.target.value)}
                    />

                    <InputMask
                      mask="(99) 999 99 99"
                      maskChar=" "
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                    >
                      {(inputProps) => (
                        <TextField
                          color="secondary"
                          {...inputProps}
                          fullWidth
                          variant="outlined"
                          label={t("number")}
                          placeholder={t("contact-p")}
                        />
                      )}
                    </InputMask>
                  </div>
                </div>
                <div className="md:mb-10">
                  <div className="flex items-center">
                    <span className="flex_center md:w-[30px] md:h-[30px] w-6 h-6 bg-zinc-800 rounded-full md:text-lg text-sm text-white">
                      2
                    </span>
                    <h1 className="text-lg font-semibold ml-3">
                      {t("payment-type")}
                    </h1>
                  </div>
                  <div className="md:my-6">
                    <div className="grid xl:grid-cols-2 grid-cols-1 my-5 gap-6">
                      {paymentMethodData.map((item) => (
                        <label key={item.id} htmlFor={item.id}>
                          <div
                            className={`flex justify-start items-center cursor-pointer md:border-2 border-[3px] rounded-lg p-2 ${
                              payment === item.value
                                ? "border-[#ff8800]"
                                : "border-gray-300"
                            }`}
                          >
                            <Radio
                              checked={payment === item.value}
                              disabled={item.id === "1" ? false : true}
                              value={item.value}
                              id={item.id}
                              name="type"
                              onChange={handlePaymentChange}
                              color="secondary"
                            />
                            <p className="grow text-gray-800 mx-2">
                              {t(`${item.name}`)}
                            </p>
                            {item.id === "2" ? (
                              <img src={Payme} alt="Icon" className="" />
                            ) : (
                              item.icon
                            )}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="flex items-center">
                    <span className="flex_center md:w-[30px] md:h-[30px] w-6 h-6 bg-zinc-800 rounded-full md:text-lg text-sm text-white">
                      3
                    </span>
                    <h1 className="text-lg font-semibold ml-3">
                      {t("method-reception")}
                    </h1>
                  </div>
                  <div className="md:my-6">
                    <div className="grid md:grid-cols-2 grid-cols-1  my-5 gap-6">
                      {deliveryTypeData.map((item) => (
                        <label key={item.id} htmlFor={item.id}>
                          <div
                            className={`flex justify-start items-center cursor-pointer md:border-2 border-[3px] rounded-lg p-2 ${
                              delivery === item.value
                                ? "border-[#ff8800]"
                                : "border-gray-300"
                            }`}
                          >
                            <Radio
                              checked={delivery === item.value}
                              disabled={item.id === "1" ? false : true}
                              value={item.value}
                              id={item.id}
                              name="type"
                              onChange={handleDeliveryChange}
                              color="secondary"
                            />
                            <p className="grow text-gray-800 mx-2">
                              {t(`${item.name}`)}
                            </p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                  <h1 className="md:text-base font-semibold text-gray-800">
                    {t("enter-address")}
                  </h1>
                  <div className="my-6 grid md:grid-cols-2 grid-cols-1 gap-5">
                    <FormControl color="secondary" fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        {t("region")}
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={findStandartRegionId[0]?.id || "11"}
                        color="secondary"
                        label={t("region")}
                        onChange={(e) => handleRegion(e)}
                      >
                        {address.regions.map((item, index) => (
                          <MenuItem key={index} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl color="secondary" fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        {t("district")}
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        placeholder="select"
                        color="secondary"
                        label={t("district")}
                        value={district || ""}
                        onChange={(e) => setDistrict(e.target.value)}
                      >
                        {(selectDistricts.length
                          ? selectDistricts
                          : defaultDistricts
                        ).map((item, index) => (
                          <MenuItem key={index} value={item.name}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <TextField
                      id="outlined-basic"
                      fullWidth
                      color="secondary"
                      variant="outlined"
                      type="text"
                      className="rounded-xl"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      label={t("street")}
                    />
                    <TextField
                      id="outlined-basic"
                      fullWidth
                      variant="outlined"
                      type="text"
                      color="secondary"
                      className="rounded-xl"
                      value={house}
                      onChange={(e) => setHouse(e.target.value)}
                      label={t("house-number")}
                    />
                  </div>
                </div>
                <div className="md:flex hidden">
                  <Button
                    type="submit"
                    className="w-full md:block hidden"
                    variant="contained"
                    color="secondary"
                    size="large"
                  >
                    {t("check-out")}
                  </Button>
                </div>
              </div>

              <div className="col-span-1 md:sticky top-5">
                <div className="sticky top-5">
                  <div className="border border-gray-300 m-1 md:rounded-xl rounded-md md:p-5 p-3">
                    <p className="text-lg font-semibold">
                      {t("producton-order-txt")}
                    </p>
                    <div className="mt-2">
                      {cart.length
                        ? cart.map((item) => (
                            <div
                              key={item._id}
                              className="flex my-2 justify-between"
                            >
                              <div className="w-[25%]">
                                <img
                                  src={item.productId.images[0].url}
                                  alt={""}
                                  className="object-cover md:h-26 md:w-26 w-16 h-1w-16 object-center"
                                />
                              </div>
                              <div className="w-[75%] md:mx-2 flex justify-center flex-col">
                                <p className="md:text-sm text-base font-normal text-gray-800">
                                  {item.productId.name}
                                </p>
                                <div className="flex md:mt-3 justify-between items-center">
                                  <Price
                                    price={item.productId.price}
                                    className="text-base font-semibold"
                                  />
                                  <span className="">
                                    {t("quantity")}
                                    {":"}
                                    {item.quantity}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))
                        : "non"}
                    </div>
                  </div>
                  <div className=" mt-5 border border-gray-300 m-1 md:rounded-xl rounded-md md:p-5 p-3">
                    <p className="text-lg font-semibold md:mb-4">
                      {t("order-txt")}
                    </p>
                    <div className="flex justify-between items-center text-sm my-2">
                      <p className="">
                        {totalQuantity} {t("price-orders")}
                      </p>
                      <Price price={totalPrice} className="" />
                    </div>
                    <div className="flex justify-between items-center text-sm my-5 md:pb-5 pb-3 border-b border-b-gray-300">
                      <p className="">{t("shipping-cost")}</p>
                      <p className="">{t("free-shipping")}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="font-semibold">{t("total-payment")}:</p>
                      <Price
                        price={totalPrice}
                        className="xl:text-2xl text-lg font-semibold"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:hidden mt-5 flex">
                <Button
                  type="submit"
                  className="w-full"
                  variant="contained"
                  color="secondary"
                  size="large"
                >
                  {t("check-out")}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
