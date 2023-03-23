import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";

function ActivationEmail() {
  const { activationtoken } = useParams();
  let { t } = useTranslation(["user"]);

  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (activationtoken) {
      const activationEmail = async () => {
        try {
          const res = await axios.post("/activation", {
            activationtoken,
          });
          setSuccess(res.data.msg);
        } catch (err) {
          err.response.data.msg && setErr(err.response.data.msg);
        }
      };
      activationEmail();
    }
  }, [activationtoken]);
  return (
    <div className="active_page min-h-[550px] flex_center">
      <div className="max-w-[500px] w-full flex_col items-center justify-center border_primary md:p-5 rounded-xl">
        <img src="/images/email-verify.png" className="md:h-44 mb-5" alt="" />
        <h1 className="md:text-xl mb-5">{t("verify-email-t")}</h1>
        <Link to={"/"}>
          <Button
            className="w-full tracking-wide font-normal"
            variant="contained"
            color="secondary"
            size="large"
          >
            {t("verify-email-b")}
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default ActivationEmail;
