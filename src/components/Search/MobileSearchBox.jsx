import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { BiMicrophone } from "react-icons/bi";
import { CgSearch } from "react-icons/cg";
import { MdClose } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const MobileSearchBox = ({ products, toggleMobileSearchBar }) => {
  const { t } = useTranslation(["product"]);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [listening, setListening] = useState(false);

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
  const CloseBar = () => {
    toggleMobileSearchBar();
    clearFilter();
  };
  const clearFilter = () => {
    setFilteredData([]);
    setQuery("");
  };
  const SearchHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : "/search");
    setFilteredData([]);
    CloseBar();
  };
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

  return (
    <div className="bg-white md:hidden animatedMobile lg:hidden fixed inset-0 z-50 min-w-full min-h-screen">
      <div className="w-full">
        <div className="flex_betwen px-3 w-full py-3 bg-gray-100">
          <form
            onSubmit={SearchHandler}
            autoComplete="off"
            className="flex items-center w-full"
          >
            <div className="relative w-full">
              <div className="flex absolute inset-y-0 left-0 items-center md:pl-3 pl-2 pointer-events-none">
                <CgSearch className="text-xl text-gray-500" />
              </div>
              <input
                type="text"
                id="voice-search"
                required
                autoFocus
                value={query}
                onChange={handleAutoComplete}
                className="w-full bg-white border-2 md:border-gray-300 text-gray-900 text-sm rounded-lg md:rounded-lg focus:ring-purple-400 md:focus:border-purple-400 focus:border-orange-400 block pl-10 p-2 md:p-2.5"
                placeholder={t("search")}
              />
              <div
                onClick={() => openVoiceSearch()}
                className="flex absolute inset-y-0 right-0 items-center pr-3"
              >
                <BiMicrophone
                  className={`${
                    listening ? "text-orange-600 text-2xl " : "text-gray-500"
                  } md:text-[22px] text-xl `}
                />
              </div>
            </div>
          </form>
          <MdClose
            onClick={CloseBar}
            className="text-4xl ml-3 text-gray-700 p-1 rounded-full"
          />
        </div>
        {filteredData.length !== 0 && (
          <div className="block w-full mt-[2px] text-left overflow-hidden z-20 max-h-full overflow-y-scroll absolute left-0">
            {filteredData.slice(0, 20).map((value, key) => {
              return (
                <Link
                  to={`/product/view/${value.slug}`}
                  onClick={clearFilter}
                  className="cursor-pointer py-2 w-full px-5 hover:bg-gray-100 flex items-center"
                  key={key}
                >
                  <img
                    src={value.images[0].url}
                    alt={value.name}
                    width="40"
                    height="40"
                  />
                  <p className="ml-5">{value.name}</p>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileSearchBox;
