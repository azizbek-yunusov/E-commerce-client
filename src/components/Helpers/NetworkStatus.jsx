import { Backdrop, Fade, Modal, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useTranslation } from "react-i18next";
import { BsWifiOff } from "react-icons/bs";
import { useNetworkStatus } from "../../hooks";

const NetworkStatus = () => {
  const isMobile = useMediaQuery("(min-width: 600px)")
  let { t } = useTranslation(["home"]);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? 500 : 320,
    boxShadow: 24,
    p: 3,
  };
  const status = useNetworkStatus();
  return (
    <div className="">
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={status ? false : true}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={status ? false : true}>
          <Box sx={style} className="rounded-xl bg-white">
            <div className="flex_col items-center">
              <BsWifiOff className="text-5xl text-gray-400 md:mb-8 mb-5" />
              <h1 className="text-xl text-gray-800 font-semibold mb-2">
                {t("offline-t")}
              </h1>
              <p className="text-center text-gray-600">{t("offline-d")}</p>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default NetworkStatus;
