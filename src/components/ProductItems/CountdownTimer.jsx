import  { useState } from "react";
import { useTranslation } from "react-i18next";

function CountdownTimer({ expire }) {
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
      seconds,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  const startTimer = () => {
    setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  };

  return (
    <div>
      <h1>Chegirma sanasi:</h1>
      {/* <p>{discountDate}</p> */}
      <h1>Qolgan vaqt:</h1>
      {timeLeft.days > 0 && <p>{timeLeft.days} kun</p>}
      <p>{timeLeft.hours} soat</p>
      <p>{timeLeft.minutes} daqiqa</p>
      <p>{timeLeft.seconds} soniya</p>
      <button onClick={startTimer}>Timerni boshlash</button>
    </div>
  );
}

export default CountdownTimer;
