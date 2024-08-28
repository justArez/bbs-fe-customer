import { convertAdressComponents } from "@/libs/helper/googleMapHelper";
import { useFilterFormStore, useGoogleMapStore, useModalStore } from "@/store/componentStore";
import { Suspense, lazy, useEffect } from "react";
import { useGetListCenter } from "@/features/centers";
import { Group, Pagination } from "@mantine/core";
import { useNavigate, useSearchParams } from "react-router-dom";

const StudioCardInfo = lazy(() => import("./CenterCardInfo"));

export default function StudioListLocation() {
  const { placeDetail } = useGoogleMapStore();
  const search = useSearchParams();
  const navigate = useNavigate();
  const { setFilterMapModal } = useModalStore();
  const { filterData, setIsQuery, setListCenter, reset } = useFilterFormStore();
  const rating = search[0].get("rating");
  const { data, isFetching } = useGetListCenter(
    filterData?.viewPortNE && filterData?.viewPortSW
      ? {
          ...filterData,
          page: (search[0].get("page") && Number(search[0].get("page"))) || 0,
          pageSize: 15,
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
    if (data) setListStudio(data.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      <div className="flex items-center w-full mb-4 gap-x-3 justify-between">
        {placeDetail?.address_components && data && (
          <>
            <h1 className="font-medium text-base">
              Có {data.total} studio tại {convertAdressComponents(placeDetail.address_components)}
            </h1>
          </>
        )}
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 item-center gap-y-5 gap-x-5 ">
        <Suspense fallback={<div></div>}>
          {data && data.data.map((studio) => <StudioCardInfo key={studio.id} studio={studio} />)}
        </Suspense>
      </div>
      {data && data.data.length > 0 && (
        <Group position="left">
          <Pagination
            className="ml-auto mt-5"
            value={data.page + 1}
            onChange={(value) => {
              if (value === data.page + 1) return;
              window.scrollTo(0, 0);
              const entries = search[0].entries();
              const searchParams = new URLSearchParams();
              for (const [key, value] of entries) {
                searchParams.append(key, value);
              }

              searchParams.set("page", String(value - 1));
              navigate(`/search-location?${searchParams.toString()}`);
            }}
            size={"md"}
            total={(data.total && Math.ceil(data?.total / data.pageSize)) || 0}
          ></Pagination>
        </Group>
      )}
    </>
  );
}
