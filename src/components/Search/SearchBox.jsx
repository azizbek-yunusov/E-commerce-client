import React, { useEffect, useState } from "react";
import { CgSearch } from "react-icons/cg";
import { BiMicrophone } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import AutoComplate from "./AutoComplate";
import { useTranslation } from "react-i18next";
import MobileSearchBox from "./MobileSearchBox";
import { recognition } from "../../utils/SpeechRecognition";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/product";

const SearchBox = () => {
  const { t } = useTranslation(["product"]);
  const navigate = useNavigate();
  const matches = useMediaQuery("(min-width: 700px)");
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [listening, setListening] = useState(false);
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const handleAutoComplete = (e) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);
    const newFilterAutoComplete = products.filter((value) => {
      return value.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    if (searchTerm === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilterAutoComplete);
    }
  };

  const clearFilter = () => {
    setFilteredData([]);
    setQuery("");
  };
  const clearVoiceSearch = () => {
    setListening(false);
    recognition.stop();
  };
  const SearchHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : "/search");
    setFilteredData([]);
    recognition.stop();
  };
  const toggleMobileSearchBar = () => {
    setShowSearch(!showSearch);
  };

  // Voice search
  const openVoiceSearch = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onresult = (event) => {
      const { transcript } = event.results[0][0];
      setQuery(transcript);
    };

    recognition.start();
  };
  useEffect(() => {
    if (!products.length) {
      dispatch(getProducts());
    }
  }, [dispatch]);
  return (
    <div className="relative">
      <form
        onSubmit={SearchHandler}
        autoComplete="off"
        onClick={toggleMobileSearchBar}
        className="flex items-center w-full"
      >
        <label htmlFor="voice-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <div className="flex absolute inset-y-0 left-0 items-center md:pl-3 pl-2 pointer-events-none">
            <CgSearch className="text-xl text-gray-500" />
          </div>
          <input
            type="text"
            id="voice-search"
            required
            value={query}
            onChange={handleAutoComplete}
            className="xl:w-[600px] lg:w-[400px] w-full bg-white border-2 md:border-gray-300 text-gray-900 text-sm rounded-lg md:rounded-lg focus:ring-purple-400 md:focus:border-[#ff8400] focus:border-orange-400 block md:pl-10 pl-10 p-2 md:p-2.5"
            placeholder={matches ? t("inputtext") : t("search")}
          />
          <div
            onClick={() => openVoiceSearch()}
            className="cursor-pointer flex absolute inset-y-0 right-0 items-center pr-3"
          >
            <BiMicrophone
              className={`${
                listening ? "text-orange-600 text-2xl " : "text-gray-500"
              } md:text-[22px] text-xl `}
            />
          </div>
        </div>
        <button
          type="submit"
          className="md:inline-flex hidden items-center py-[10px] px-3 ml-2 text-sm font-medium text-white bg- rounded-lg bg_secondary"
        >
          <CgSearch className="text-xl text-gray-50" />
        </button>
      </form>
      <AutoComplate
        filteredData={filteredData}
        query={query}
        clearFilter={clearFilter}
      />
      {showSearch && (
        <MobileSearchBox
          products={products}
          toggleMobileSearchBar={toggleMobileSearchBar}
        />
      )}
    </div>
  );
};

export default SearchBox;
