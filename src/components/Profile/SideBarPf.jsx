import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { Button } from "@mui/material";
import { BsFillCalendarFill } from "react-icons/bs";
import moment from "moment";
import { signOut } from "../../redux/actions/authAction";
import { useTranslation } from "react-i18next";
import { BiEdit, BiLogIn } from "react-icons/bi";

const SideBarPf = () => {
  let { t } = useTranslation(["user"]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogged } = useSelector((state) => state.auth);
  const { standart } = useSelector((state) => state.address);
  const { user } = useSelector((state) => state.auth);

  const signOutHandle = async () => {
    await dispatch(signOut());
    if (isLogged) {
      navigate("/signin");
    }
    toast.success(t("logged-out"));
  };
  return (
    <div className="flex flex-col justify-between sticky top-56">
      <div className="relative flex items-center flex-col justify-between w-[350px] h-[450px] bg-white -mt-28 ml-5 md:py-5 border_l rounded-2xl">
        <div className="flex flex-col items-center">
          <div className="z-10 overflow-hidden md:rounded-2xl max-w-max bg-white">
            <img
              className="md:rounded-2xl h-40 w-40 object-cover bg-orange-500"
              src={user?.avatar?.url}
              alt=""
            />
          </div>
          <h1 className="md:my-3 md:text-2xl text-gray-800 font-semibold my-3 ">
            {user?.lastName ? `${user?.name} ${user?.lastName}` : user?.name}
          </h1>
          {standart ? (
            <div className="flex items-center bg-light-green-100 rounded-md p-1 px-2">
              <MdLocationOn className="text-lg text-gray-600" />
              <p className="text-sm font-semibold text-gray-600">
                {standart.region.slice(0, -7)}
                {", "}
                {standart.district.slice(0, -5)}
                {", "}
                {standart.street}
              </p>
            </div>
          ) : null}
          <div className="flex items-center text-base font-semibold text-gray-600 my-2">
            <MdEmail className="text-base mx-1" />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center text-base font-semibold text-gray-600 my-1">
            <BsFillCalendarFill className="text-sm mx-1" />
            <span>{moment(user.createdAt).format("LL")}</span>
          </div>
        </div>
        <div className="flex md:my-2">
          <Link to="/profile/update">
            <Button
              variant="contained"
              color="secondary"
              sx={{ marginRight: "8px" }}
              startIcon={<BiEdit />}
            >
              {t("edit")}
            </Button>
          </Link>
          <Button
            color="error"
            onClick={() => signOutHandle()}
            variant="contained"
            startIcon={<BiLogIn />}
          >
            {t("sign-out")}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default SideBarPf;
