import  { useEffect, useState } from "react";

const DayTimer = () => {
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999); // Bugungi kunni oxiriga sozlash

      const difference = endOfDay - now;
      const hoursLeft = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutesLeft = Math.floor(
        (difference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const secondsLeft = Math.floor((difference % (1000 * 60)) / 1000);

      setHours(hoursLeft);
      setMinutes(minutesLeft);
      setSeconds(secondsLeft);

      if (difference < 0) {
        clearInterval(interval);
        setHours("Time is up!");
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className="flex items-center">
      <div className="w-7 flex_center border rounded mx-0.5">
        {hours.toString().padStart(2, "0")}
      </div>
      {" : "}
      <div className="w-7 flex_center border rounded mx-0.5">
        {minutes.toString().padStart(2, "0")}
      </div>
      {":"}
      <div className="w-7 flex_center border rounded mx-0.5">
        {seconds.toString().padStart(2, "0")}
      </div>
    </div>
  );
};

export default DayTimer;
