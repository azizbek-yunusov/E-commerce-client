import { Box, Fade, Modal, useMediaQuery } from "@mui/material";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { clearErrors, toggleLoginModal } from "../../redux/auth";
import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal";
import VerifyModal from "./VerifyModal";

const AuthModal = () => {
  const { isLoginShow, activModal, isLogged, isError, message } = useSelector(
    (state) => state.auth
  );
  let { t } = useTranslation(["home"]);
  const matches = useMediaQuery("(min-width:600px)");
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(toggleLoginModal());
  };
  useEffect(() => {
    if (isLogged) {
      toast.success(t("sign-in-succ"));
      handleClose();
    }
    if (isError) {
      toast.error(message);
      dispatch(clearErrors());
    }
  }, [dispatch, isError, isLogged, message, t]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: matches ? 400 : 320,
    boxShadow: 24,
    p: matches ? 4 : 2.5,
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
          {activModal === "signin" && <SignInModal />}
          {activModal === "signup" && <SignUpModal />}
          {activModal === "verify" && <VerifyModal />}
        </Box>
      </Fade>
    </Modal>
  );
};

export default AuthModal;
