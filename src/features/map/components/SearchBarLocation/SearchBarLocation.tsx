import { MapPinIcon, SearchIcon } from "@/assets/icons";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchLocationStore } from "@/store/componentStore";
import { useAutoCompleteLocation } from "@/features/map/api";
import { useDebouncedState } from "@mantine/hooks";
import { Button } from "@mantine/core";
import { Dropdown } from "@/components/Dropdown";
import Input from "@/components/common/Input";
import { encodeStringtoURI } from "@/libs/helper";

export default function SearchBarLocation() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [locationName, setLocationName] = useDebouncedState("", 400);
  const [isAutocompleteVisible, setIsAutocompleteVisible] = useState(false);
  const { sessionToken, setPlaceChoose, placeChoose } = useSearchLocationStore();
  const { data, isFetching } = useAutoCompleteLocation({
    input: locationName,
    sessionToken: sessionToken,
  });
  const navigate = useNavigate();

  useEffect(() => {
    document.addEventListener("click", () => {
      setIsAutocompleteVisible(false);
    });
    return () =>
      document.removeEventListener("click", () => {
        setIsAutocompleteVisible(false);
      });
  }, []);

  return (
    <div className="w-full flex items-center bg-white shadow-[0_0_0_4px_#fff] mx-auto h-16 rounded-2xl relative">
      <div className="p-1 h-full flex-1">
        <div
          className="input-search-location p-1 rounded-2xl h-full flex items-center"
          onClick={(e) => {
            if (e.currentTarget.contains(e.target as Node)) e.stopPropagation();
          }}
        >
          <div className="p-3">
            <MapPinIcon styles={{ color: "#000" }} />
          </div>
          <Input
            ref={inputRef}
            defaultValue={locationName}
            onFocus={() => {
              setIsAutocompleteVisible(true);
            }}
            onChange={(e) => {
              if (e.target.value !== " ") {
                setLocationName(e.target.value);
              }
              if (placeChoose !== null) setPlaceChoose(null);
            }}
            className="mr-1 input-container text-base focus-within:outline-none"
            type="primary"
            placeholder="Tìm kiếm theo địa điểm, quận, tên đường..."
          />
          <Dropdown
            animate={isAutocompleteVisible}
            tabIndex={-1}
            className="bg-white !text-black h-fit absolute top-full left-0 w-full"
          >
            <ul className="font-medium flex flex-col gap-y-1">
              {isFetching && (
                <li className="flex items-center justify-center">
                  <p className="w-1/2">Đang tìm kiếm...</p>
                </li>
              )}
              {!isFetching && data?.predictions.length === 0 && (
                <li className="flex items-center justify-center">
                  <p className="w-1/2">Không tìm thấy địa điểm</p>
                </li>
              )}
              {locationName.length > 0 &&
                !isFetching &&
                data?.predictions.map((prediction) => {
                  return (
                    <li key={prediction.place_id}>
                      <button
                        onClick={() => {
                          setPlaceChoose(prediction);
                          setIsAutocompleteVisible(false);
                          if (inputRef.current) inputRef.current.value = prediction.description;
                        }}
                        title="suggest-location-item"
                        className="flex items-center w-full p-2 sm:p-4 hover:bg-lime-100 rounded-2xl"
                      >
                        <div className="block sm:hidden">
                          <MapPinIcon styles={{ width: 16, minWidth: 16, height: 16 }} />
                        </div>
                        <div className="hidden sm:block">
                          <MapPinIcon styles={{ width: 20, minWidth: 20, height: 20 }} />
                        </div>
                        <p className="ml-2 sm:ml-4 text-truncation">{prediction.description}</p>
                      </button>
                    </li>
                  );
                })}
            </ul>
          </Dropdown>
        </div>
      </div>
      <div className="border-[1px] border-solid border-[#a9afbb] h-10 mx-2"></div>
      <div className="flex items-center justify-center relative h-full p-1">
        <Button
          rightSection={
            <SearchIcon styles={{ stroke: "#fff", strokeWidth: "3", width: "20", height: "20" }} />
          }
          onClick={() => {
            if (data && data.predictions.length > 0) {
              const navigateData = placeChoose || data.predictions[0];
              navigate(
                "/search-location?location=" +
                  encodeStringtoURI(navigateData.description!) +
                  "&placeId=" +
                  navigateData.place_id,
              );
            }
          }}
          className="!rounded-2xl px-6 py-4 h-fit"
        >
          <p className="justify-self-center font-semibold text-base leading-none">Tìm Kiếm</p>
        </Button>
      </div>
    </div>
  );
}
