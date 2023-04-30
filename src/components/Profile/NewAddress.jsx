import {
  Button,
  Fade,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import address from "../../data/address.json";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "../../redux/address";

const NewAddress = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const { access_token } = useSelector((state) => state.auth);
  const { isSuccess, addresses } = useSelector((state) => state.address);
  const matches = useMediaQuery("(min-width:600px)");
  const { t } = useTranslation(["user"]);
  const [region, setRegion] = useState("Toshkent Viloyati");
  const [district, setDistrict] = useState("");
  const [street, setStreet] = useState("");
  const [house, setHouse] = useState("");
  const [selectDistricts, setSelectDistricts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleClose = () => setOpen(false);
  const defaultDistricts = address.districts.filter((value) => {
    return value.region_id === 11;
  });
  const handleRegion = (e) => {
    const getRegionId = e.target.value;
    const getRegionData = address?.regions.find(
      (reg) => reg.id === getRegionId
    );
    const getDistrictsdata = address.districts.filter(
      (item) => item.region_id === getRegionId
    );
    setRegion(getRegionData.name);
    setSelectDistricts(getDistrictsdata);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: matches ? 800 : 320,
    boxShadow: 24,
    p: matches ? 4 : 2,
  };

  const newAddressHandle = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let addressData = {
        region,
        district,
        street,
        house,
      };
      dispatch(addAddress({ addressData, access_token }));
      if (isSuccess) {
        setOpen(false);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      sx={{ backgroundColor: "#ffffff0a", backdropFilter: "blur(1px)" }}
    >
      <Fade in={open}>
        <Box sx={style} className="rounded-xl bg-white">
          <h1 className="text-gray-800 text-2xl font-semibold">
            {t("new-address")}
          </h1>

          <form onSubmit={newAddressHandle}>
            <div className="my-6 grid md:grid-cols-2 grid-cols-1 gap-5">
              <FormControl>
                <InputLabel id="demo-simple-select-label">
                  {t("region")}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue={"11"}
                  color="secondary"
                  label={t("region")}
                  onChange={(e) => handleRegion(e)}
                >
                  {address.regions.map((item, index) => (
                    <MenuItem key={index} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <InputLabel id="demo-simple-select-label">
                  {t("district")}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  placeholder="select"
                  color="secondary"
                  label={t("district")}
                  value={district || ""}
                  onChange={(e) => setDistrict(e.target.value)}
                >
                  {(selectDistricts.length
                    ? selectDistricts
                    : defaultDistricts
                  ).map((item, index) => (
                    <MenuItem key={index} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                id="outlined-basic"
                color="secondary"
                variant="outlined"
                type="text"
                className="rounded-xl"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                label={t("street")}
              />
              <TextField
                id="outlined-basic"
                variant="outlined"
                type="text"
                color="secondary"
                className="rounded-xl"
                value={house}
                onChange={(e) => setHouse(e.target.value)}
                label={t("house-number")}
              />
            </div>
            <div className="flex items-center justify-end mt-5">
              <Button
                onClick={handleClose}
                variant="contained"
                size="large"
                color="info"
                sx={{ borderRadius: "6px", marginRight: "15px" }}
              >
                {t("cancel")}
              </Button>

              <Button
                type="submit"
                className="tracking-wide font-normal"
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
                  `${t("save")}`
                )}
              </Button>
            </div>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default NewAddress;
