import CenterListLocation from "@/features/centers/components/CenterListLocation";
import { useSearchLocationStore } from "@/store/componentStore";
import { LoadingOverlay } from "@mantine/core";
import { Suspense, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";
import GoogleMap from "../components/GoogleMap";

export default function SearchLocation() {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const { placeChoose, setPlaceChoose } = useSearchLocationStore();
  //   const [openMap, setOpenMap] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      searchParams.get("location") === "" ||
      searchParams.get("placeId") === "" ||
      searchParams.get("location") === null ||
      searchParams.get("placeId") === null
    ) {
      navigate("/");
    } else if (placeChoose === null) {
      setPlaceChoose({
        place_id: searchParams.get("placeId")!,
        description: searchParams.get("location")!,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.get("location"), searchParams.get("placeId"), searchParams.get("category")]);

  return (
    <>
      <div id="content" className="content-wrapper min-h-[calc(100vh-158px)] relative">
        <div className="flex relative">
          <div
            className={twMerge(
              "p-4 w-full lg:w-[55%] lg:block xl:w-[63%] relative z-10",
              //   openMap ? "hidden" : "block",
            )}
          >
            <Suspense fallback={<LoadingOverlay />}>
              <CenterListLocation />
            </Suspense>
          </div>
          <div
            className={twMerge(
              "flex-1 w-full absolute lg:static lg:w-auto",
              //   openMap ? "z-30" : "",
            )}
          >
            <Suspense fallback={<LoadingOverlay />}>
              <GoogleMap visible={true} />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
