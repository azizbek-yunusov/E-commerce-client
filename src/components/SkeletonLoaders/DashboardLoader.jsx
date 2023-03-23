import React from "react";

const DashboardLoader = () => {
  return (
    <div className="fixed top-0 left-0 w-full min-h-screen z-50">
      <div className="grid grid-cols-12 min-h-screen bg-gray-100">
        <div className="col-span-3 h-full bg-gray-400"></div>
        <div className="col-span-8 h-full">
          <div className="bg-gray-400 w-full h-14"></div>
          <div className="bg-gray-300 w-full h-full">
            <div className="p-5 rounded-lg h-full bg-gray-500"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLoader;
