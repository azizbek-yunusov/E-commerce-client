import { Button } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

function OTPInput({ onSubmit, user, isError }) {
  let { t } = useTranslation(["home"]);
  const [otp, setOTP] = useState(["", "", "", ""]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
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
  // email string security
  let { email } = user;
  let initial = email.charAt(0);
  let last = email.charAt(email.length - 11);
  console.log(initial);
  return (
    <section>
      <div className="flex_col items-center">
        <h1 className="text-4xl md:mb-7 mb-5">{t("otp-verification")}</h1>
        <p className=" md:mb-5 mb-3">
          {t("sent-email-otp-descr")}
          <span className="text-orange-500 ml-1">
            {initial}.........{last}@gmail.com
          </span>
        </p>

        <div className="flex">
          {otp.map((value, index) => (
            <div key={index} className="w-16 h-16 md:mx-2 mx-1">
              <input
                type="text"
                maxLength={1}
                value={value}
                onChange={(event) => handleChange(event, index)}
                className={ `w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-2xl border-2 ${(error || isError) ? "border-red-500" : "border-gray-300" } text-lg bg-white focus:bg-gray-50 focus:border-none focus:ring-2 ring-orange-400`}
                ref={(el) => (inputs.current[index] = el)}
              />
            </div>
          ))}
        </div>
        <p className="my-3">
          {t("didnt-receive-code")}{" "}
          <span className="text-orange-500">{t("resent")}</span>
        </p>
        <Button
          className="w-full tracking-wide font-normal"
          variant="contained"
          color="secondary"
          size="large"
        >
          {loading ? (
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
            `${t("verify")}`
          )}
        </Button>

        {error && (
          <span style={{ color: "red" }}>Please enter numbers only</span>
        )}
      </div>
    </section>
  );
}

export default OTPInput;
