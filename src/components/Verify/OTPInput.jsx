import { Button } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

function OTPInput({ onSubmit }) {
  let { t } = useTranslation(["home"]);
  const [otp, setOTP] = useState(["", "", "", ""]);
  const [error, setError] = useState(false);
  const inputs = useRef([]);

  useEffect(() => {
    if (otp.every((value) => value.length === 1)) {
      onSubmit(otp.join(""));
    }
  }, [otp]);

  const handleChange = (event, index) => {
    const value = event.target.value;
    const newOTP = [...otp];
    if (/^\d*$/.test(value)) {
      newOTP[index] = value;
      setOTP(newOTP);
      setError(false);
      if (index < 3 && value !== "") {
        inputs.current[index + 1].focus();
      }
    } else {
      setError(true);
    }
  };

  return (
    <section>
      <div className="flex md:mb-5">
        {otp.map((value, index) => (
          <div key={index} className="w-16 h-16 md:mx-2">
            <input
              type="text"
              maxLength={1}
              value={value}
              onChange={(event) => handleChange(event, index)}
              className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-2xl border-2 border-gray-300 text-lg bg-white focus:bg-gray-50 focus:border-none focus:ring-2 ring-orange-400"
              ref={(el) => (inputs.current[index] = el)}
            />
          </div>
        ))}
      </div>
      <Button
        className="w-full tracking-wide font-normal"
        variant="contained"
        color="secondary"
        size="large"
      >
        {t("sumbit")}
      </Button>
      {error && <span style={{ color: "red" }}>Please enter numbers only</span>}
    </section>
  );
}

export default OTPInput;
