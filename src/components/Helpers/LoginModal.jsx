import {
  Box,
  Button,
  Checkbox,
  Fade,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Modal,
  TextField,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { signIn, toggleLoginModal } from "../../redux/auth";

const LoginModal = () => {
  const [loader, setLoader] = useState(false);
  const { isLoginShow, isLogged, isError, message } = useSelector(
    (state) => state.auth
  );

  let { t } = useTranslation(["home"]);
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const storeDataEl = useRef();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClose = () => {
    dispatch(toggleLoginModal());
  };
  const signInSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!formState.email) {
      errors.email = t("email-valid");
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      errors.email = t("email-invalid");
    }
    if (!formState.password) {
      errors.password = t("password-valid");
    }
    setFormErrors(errors);

    // submit form if no errors
    if (Object.keys(errors).length === 0) {
      try {
        setLoader(true);
        await dispatch(signIn(formState));
      } catch (err) {
        console.log(err);
      }
    }
  };
  const matches = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    if (isLogged) {
      setLoader(false);
      toast.success(t("sign-in-succ"));
      handleClose()
    }
    if (isError) {
      toast.error(message);
      dispatch(clearErrors());
      setLoader(false);
    }
  }, [dispatch, isError, isLogged, message]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: matches ? 400 : 320,
    boxShadow: 24,
    p: matches ? 4 : 2,
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={Boolean(isLoginShow)}
      onClose={handleClose}
      closeAfterTransition
      sx={{ backgroundColor: "#ffffff0a", backdropFilter: "blur(1px)" }}
    >
      <Fade in={Boolean(isLoginShow)}>
        <Box sx={style} className="rounded-xl text-center bg-white">
          <h1 className="text-gray-800 text-2xl font-semibold">
            {t("sign-in")}
          </h1>

          <form onSubmit={signInSubmit}>
            <div className="mt-6">
              <TextField
                id="outlined-basic"
                name="email"
                fullWidth
                color="secondary"
                variant="outlined"
                label={t("email")}
                type="email"
                autoComplete="email"
                autoFocus
                value={formState.email}
                onChange={handleChange}
                error={Boolean(formErrors.email)}
                helperText={formErrors.email}
              />
            </div>
            <div className="mt-6">
              <TextField
                id="outlined-basic"
                fullWidth
                color="secondary"
                variant="outlined"
                name="password"
                label={t("password")}
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={formState.password}
                onChange={handleChange}
                error={Boolean(formErrors.password)}
                helperText={formErrors.password}
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
            <div className="mt-1 flex justify-between items-center text-sm">
              <FormControlLabel
                label={t("remember")}
                className="text-gray-500"
                control={
                  <Checkbox
                    id="storeData"
                    name="storeData"
                    color="secondary"
                    ref={storeDataEl}
                  />
                }
              />
              <Link className="text-purple-400" to={"/signin"}>
                {t("forgot-pass")}
              </Link>
            </div>
            <div className="mt-3">
              <Button
                type="submit"
                className="w-full tracking-wide font-normal"
                variant="contained"
                color="secondary"
                size="large"
              >
                {loader ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    {t("loading")}...
                  </div>
                ) : (
                  `${t("sign-in-b")}`
                )}
              </Button>
            </div>
          </form>
          <p className="mt-5 text-base text-center text-gray-400">
            {t("new-platform")}{" "}
            <Link
              to={"/signup"}
              className="text-blue-500 focus:outline-none focus:underline hover:underline"
            >
              {t("create-a")}
            </Link>
            .
          </p>
        </Box>
      </Fade>
    </Modal>
  );
};

export default LoginModal;
