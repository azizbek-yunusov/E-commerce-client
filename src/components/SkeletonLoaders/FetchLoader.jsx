import { Backdrop, CircularProgress } from "@mui/material";

const FetchLoader = ({ isLoading }) => {
  return (
    <div className="w-full min-h-screen fixed top-0 left-0 z-40">
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
