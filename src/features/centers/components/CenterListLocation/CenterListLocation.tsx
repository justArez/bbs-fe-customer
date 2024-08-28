import { convertAdressComponents } from "@/libs/helper/googleMapHelper";
import { useFilterFormStore, useGoogleMapStore } from "@/store/componentStore";
import { Suspense, lazy, useEffect, useState } from "react";
import { useGetListCenter } from "@/features/centers";
import { Pagination } from "@mantine/core";
import { useNavigate, useSearchParams } from "react-router-dom";

const CenterCardInfo = lazy(() => import("./CenterCardInfo"));

export default function CenterListLocation() {
  const { placeDetail } = useGoogleMapStore();
  const search = useSearchParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { filterData, setIsQuery, setListCenter, reset, listCenter } = useFilterFormStore();
  const { data, isFetching } = useGetListCenter(
    filterData?.neLat && filterData?.neLng && filterData?.swLat && filterData?.swLng
      ? {
          neLat: filterData.neLat,
          neLng: filterData.neLng,
          swLat: filterData.swLat,
          swLng: filterData.swLng,
        }
      : {},
  );

  useEffect(() => {
    setIsQuery(isFetching);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching]);

  useEffect(() => {
    return () => reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data) {
      const pagination = data.slice((page - 1) * 2, page * 2);
      setListCenter(pagination);
      window.scrollTo(0, 0);
      const entries = search[0].entries();
      const searchParams = new URLSearchParams();
      for (const [key, value] of entries) {
        searchParams.append(key, value);
      }
      setPage(1);
      searchParams.set("page", "1");
      navigate(`/search-location?${searchParams.toString()}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, filterData]);

  return (
    <>
      <div className="flex items-center w-full mb-4 gap-x-3 justify-between">
        {placeDetail?.address_components && data && (
          <>
            <h1 className="font-medium text-base">
              Có {data.length} center tại {convertAdressComponents(placeDetail.address_components)}
            </h1>
          </>
        )}
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 item-center gap-y-5 gap-x-5 ">
        <Suspense fallback={<div></div>}>
          {listCenter &&
            listCenter.map((center) => <CenterCardInfo key={center.id} center={center} />)}
        </Suspense>
      </div>
      {data && data.length > 0 && (
        <div className="flex justify-end">
          <Pagination
            className="ml-auto mt-5"
            value={page}
            onChange={(value) => {
              if (value === page) return;
              window.scrollTo(0, 0);
              const entries = search[0].entries();
              const searchParams = new URLSearchParams();
              for (const [key, value] of entries) {
                searchParams.append(key, value);
              }
              setPage(value);
              searchParams.set("page", value.toString());
              navigate(`/search-location?${searchParams.toString()}`);
            }}
            size={"md"}
            total={(data.length && Math.ceil(data.length / 2)) || 0}
          ></Pagination>
        </div>
      )}
    </>
  );
}
