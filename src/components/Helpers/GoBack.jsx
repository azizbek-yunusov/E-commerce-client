import React from "react";
import { FiChevronLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const GoBack = () => {
  const goBack = useNavigate();
  return (
    <div
      onClick={() => goBack(-1)}
      className="p-1 border_primary cursor-pointer rounded-lg"
    >
      <FiChevronLeft className="text-2xl text-gray-500" />
    </div>
  );
};

export default GoBack;
