import { useEffect, useState } from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { BsCheckCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import LayoutP from "./LayoutP";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { Button, CircularProgress } from "@mui/material";
import { deleteAddress, getMyAddresses, standardizationAddress } from "../redux/address";
import { HelmetTitle } from "../utils";
import NewAddress from "../components/Profile/NewAddress";

const Addresses = () => {
  let { t } = useTranslation(["user"]);
  const dispatch = useDispatch();
  const { access_token } = useSelector((state) => state.auth);
  const { isLoading, addresses } = useSelector((state) => state.address);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const deleteAddressHandle = async (id) => {
    try {
      dispatch(deleteAddress({ id, access_token }));
      toast.success(t("delete-address"));
    } catch (err) {
      console.log(err);
    }
  };
  const standardizationAddressHandle = async (id) => {
    try {
      dispatch(standardizationAddress({ id, access_token }));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (access_token) {
      dispatch(getMyAddresses(access_token));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [access_token]);

  console.log(addresses);
  return (
    <LayoutP>
      <HelmetTitle title={`${t("addresses")} - ${t("personal")}`} />
      <div className="flex justify-between items-center md:my-0 my-4">
        <h1 className="text-2xl font-semibold text-gray-700">
          {t("addresses")}
        </h1>
        <Button
          size="large"
          variant="contained"
          color="secondary"
          onClick={() => handleOpen()}
        >
          {t("new-address")}
        </Button>
        <NewAddress open={open} setOpen={setOpen} />
      </div>
      {!isLoading ? (
        <div className="min-h-[200px] md:my-5">
          {addresses.length ? (
            <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
              {addresses.map((item) => (
                <div
                  key={item._id}
                  className="md:p-5 p-3 border-2 shadow-lg rounded-lg border-orange-500"
                >
                  <div className="flex justify-between md:mb-2">
                    <div className="grid grid-cols-2 gap-5">
                      <div className="">
                        <ul className="text-gray-600">
                          <li className="lg:my-2 my-1">
                            {t("region")}
                            {":"}
                          </li>
                          <li className="lg:my-2 my-1">
                            {t("district")}
                            {":"}
                          </li>
                          <li className="lg:my-2 my-1">
                            {t("street")}
                            {":"}
                          </li>
                        </ul>
                      </div>
                      <div className="">
                        <ul className="text-gray-800 font-semibold">
                          <li className="lg:my-2 my-1">{item.region}</li>
                          <li className="lg:my-2 my-1">{item.district}</li>
                          <li className="lg:my-2 my-1">{item.street}</li>
                        </ul>
                      </div>
                    </div>
                    <BiEdit className="cursor-pointer text-3xl text-gray-400" />
                  </div>
                  <div className="flex justify-end items-center md:mt-7 mt-5">
                    <Button
                      size="medium"
                      variant="contained"
                      color="error"
                      sx={{ borderRadius: "6px", marginRight: "8px" }}
                      onClick={() => deleteAddressHandle(item._id)}
                      className="mr-3"
                      startIcon={<BiTrash />}
                    >
                      {t("delete")}
                    </Button>
                    {item.standart ? (
                      <Button
                        size="medium"
                        variant="contained"
                        className="ml-2"
                        color="secondary"
                        onClick={() => standardizationAddressHandle(item._id)}
                        startIcon={<BsCheckCircle />}
                      >
                        {t("default")}
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        size="medium"
                        color="inherit"
                        onClick={() => standardizationAddressHandle(item._id)}
                        startIcon={<BsCheckCircle />}
                        className="ml-2"
                      >
                        {t("default")}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center flex-col mt-12">
              <img src="/images/location.png" className="h-32" alt="Location" />
              <h1 className="md:text-2xl text-xl font-semibold text-gray-700">
                {t("not-address")}
              </h1>
            </div>
          )}
        </div>
      ) : (
        <CircularProgress />
      )}
    </LayoutP>
  );
};

export default Addresses;
