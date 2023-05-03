import styled from "@emotion/styled";
import {
  Box,
  Breadcrumbs,
  Button,
  Checkbox,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { HelmetTitle } from "../../utils";
import LayoutP from "./LayoutP";
import InputMask from "react-input-mask";
import {
  changePassword,
  editProfile,
  uploadAvatar,
} from "../../redux/actions/userAction";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineUser,
} from "react-icons/ai";
import { BiCamera, BiLockAlt, BiRefresh } from "react-icons/bi";

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    textAlign: "center",
    marginBottom: theme.spacing(4),
  },
}));

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: "18px",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    marginLeft: 0,
    textAlign: "center",
  },
}));

const EditMyProfile = () => {
  const { t } = useTranslation(["user"]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, user } = useSelector((state) => state.auth);
  const { access_token } = useSelector((state) => state.auth);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [conNewPassword, setConNewpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [disabledPass, setDisabledPass] = useState(true);
  const [passwordError, setPasswordError] = useState("");

  const editProfileHandle = async (e) => {
    e.preventDefault();
    try {
      let userData = { name, lastName, email, phoneNumber };
      dispatch(editProfile(userData, access_token));
      if (oldPassword && newPassword && conNewPassword) {
        if (newPassword.length < 8) {
          setPasswordError("Password must be at least 8 characters long");
        } else if (!/\d/.test(newPassword) || !/[!@#$%^&*]/.test(newPassword)) {
          setPasswordError(
            "Password must contain at least one number and one special character (!@#$%^&*)"
          );
        } else {
          setPasswordError("");
          let passwords = { oldPassword, newPassword, conNewPassword };
          dispatch(changePassword(passwords, access_token));
        }
      }
      if (!isLoading) {
        toast.success(t("success-edited"));
        navigate("/profile");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const uploadAvatarHandle = async () => {
    try {
      dispatch(uploadAvatar(avatar, access_token));
    } catch (err) {
      console.log(err);
    }
  };

  const onChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };
  useEffect(() => {
    if (user) {
      setName(user?.name || "");
      setLastName(user?.lastName || "");
      setEmail(user?.email || "");
      setPhoneNumber(user?.phoneNumber || "");
      setAvatarPreview(user?.avatar?.url || "/images/profile.png");
    }
    window.scrollTo(0, 300);
  }, [user]);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <HelmetTitle title={`${t("edit-profile")} - ${t("personal")}`} />
      <LayoutP>
        <section className="relative">
          <div className="flex justify-between items-center md:mb-4 mb-2">
            <h1 className="md:text-2xl text-xl font-semibold">
              {t("edit-profile")}
            </h1>
            <Breadcrumbs className="md:flex hidden">
              <Link to={"/"} className="">
                {t("home")}
              </Link>
              <Link to={"/profile"} className="">
                {t("profile")}
              </Link>
              <Link to={"/profile/update"} className="">
                {t("edit-profile")}
              </Link>
            </Breadcrumbs>
          </div>

          <form onSubmit={editProfileHandle}>
            <div className="grid grid-cols-12 gap-x-8">
              <div className="col-span-12 mb-4">
                <div className="flex items-center">
                  <img src={avatarPreview} alt="avatar" className="md:mr-6 object-cover rounded-xl mb-2 md:h-32 md:w-32 h-28 w-2h-28 bg-purple-700" />
                  <Box>
                    <ButtonStyled
                      color="secondary"
                      component="label"
                      variant="contained"
                      htmlFor="account-settings-upload-image"
                      startIcon={<BiCamera />}
                    >
                      {t("upload-avatar")}
                      <input
                        hidden
                        type="file"
                        onChange={onChange}
                        accept="image/png, image/jpeg"
                        id="account-settings-upload-image"
                      />
                    </ButtonStyled>
                    <ResetButtonStyled
                      color="error"
                      variant="outlined"
                      startIcon={<BiRefresh />}
                      onClick={() => setAvatar("/images/profile.png")}
                    >
                      {t("reset")}
                    </ResetButtonStyled>
                    <p className="text-gray-500 text-sm mt-5">
                      {t("upload-avatar-t")}
                    </p>
                  </Box>
                </div>
              </div>
              <div className="md:col-span-6 col-span-12">
                <div className="flex items-center text-gray-700">
                  <AiOutlineUser className="text-xl mr-1" />
                  <p className="text-xl">{t("profile-data")}</p>
                </div>
                <TextField
                  fullWidth
                  color="secondary"
                  sx={{ marginY: 2 }}
                  required
                  label={t("name")}
                  placeholder={t("name-p")}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <TextField
                  fullWidth
                  color="secondary"
                  sx={{ marginY: 2 }}
                  required
                  label={t("last-name")}
                  placeholder={t("last-name-p")}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />

                <TextField
                  fullWidth
                  color="secondary"
                  sx={{ marginY: 2 }}
                  required
                  type="email"
                  label={t("email")}
                  placeholder={t("email-p")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <InputMask
                  mask="(99) 999 99 99"
                  maskChar=" "
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                >
                  {(inputProps) => (
                    <TextField
                      fullWidth
                      color="secondary"
                      sx={{ marginY: 2 }}
                      required
                      {...inputProps}
                      variant="outlined"
                      label={t("contact")}
                      placeholder={t("contact-p")}
                    />
                  )}
                </InputMask>
              </div>
              <div className="md:col-span-6 col-span-12">
                <label htmlFor="disabled">
                  <div className="flex items-center text-gray-700">
                    <BiLockAlt className="text-xl mr-1" />
                    <p className="text-xl">{t("password-change")}</p>
                    <Checkbox
                      color="secondary"
                      value={disabledPass}
                      onChange={() => setDisabledPass(!disabledPass)}
                      sx={{ paddingY: 0 }}
                    />
                  </div>
                </label>

                <TextField
                  fullWidth
                  color="secondary"
                  sx={{ marginY: 2 }}
                  required
                  disabled={disabledPass}
                  type={showPassword ? "text" : "password"}
                  label={t("current-password")}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? (
                            <AiOutlineEye />
                          ) : (
                            <AiOutlineEyeInvisible />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <div>
                  <TextField
                    fullWidth
                    color="secondary"
                    disabled={disabledPass}
                    sx={{ marginY: 2 }}
                    required
                    type={showPassword ? "text" : "password"}
                    label={t("new-password")}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    error={!!passwordError}
                    helperText={passwordError}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? (
                              <AiOutlineEye />
                            ) : (
                              <AiOutlineEyeInvisible />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <div>
                    <p className="mb-2 text-gray-600">
                      {t("password-required")}
                    </p>
                    <ul className="list-disc text-gray-400 list-inside">
                      <li className="my-1">{t("password-req-first")}</li>
                      <li className="my-1">{t("password-req-two")}</li>
                    </ul>
                  </div>
                </div>
                <TextField
                  fullWidth
                  color="secondary"
                  sx={{ marginY: 2 }}
                  required
                  disabled={disabledPass}
                  type={showPassword ? "text" : "password"}
                  label={t("confirm-new-password")}
                  value={conNewPassword}
                  onChange={(e) => setConNewpassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? (
                            <AiOutlineEye />
                          ) : (
                            <AiOutlineEyeInvisible />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>

            <div className="flex_center my-5">
              <Button
                variant="contained"
                color="info"
                onClick={() => navigate(-1)}
                sx={{ marginRight: 2 }}
                className="w-40"
              >
                {t("cancel")}
              </Button>
              <Button
                color="secondary"
                type="submit"
                className="w-40"
                variant="contained"
                onClick={() => uploadAvatarHandle()}
              >
                {t("save")}
              </Button>
            </div>
          </form>
        </section>
      </LayoutP>
    </>
  );
};

export default EditMyProfile;
