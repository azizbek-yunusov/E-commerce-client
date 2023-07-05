import { useState } from "react";
import { useTranslation } from "react-i18next";

function DiscountExpire({ expire }) {
  let { t } = useTranslation(["product"]);
  const calculateTimeLeft = () => {
    const currentDate = new Date();
    const targetDate = new Date(expire);
    const difference = targetDate.getTime() - currentDate.getTime();

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  const startTimer = () => {
    setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  };

  return (
    <div className="flex text-xs text-red-500 font-semibold">
      {timeLeft.days > 0 && (
        <p>
          {timeLeft.days} {t("days")}.
        </p>
      )}
      <p>
        {timeLeft.hours} {t("hours")}. 
      </p>
      <p>
        {timeLeft.minutes} {t("minutes")} 
      </p>
    </div>
  );
}

export default DiscountExpire;
