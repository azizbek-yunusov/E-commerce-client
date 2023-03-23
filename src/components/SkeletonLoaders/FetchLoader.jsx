import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

const FetchLoader = ({ isLoading }) => {
  return (
    <div className="w-full min-h-screen">
      <Backdrop
        sx={{
          color: "#fff",
          backdropFilter: "blur(3px)",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default FetchLoader;
