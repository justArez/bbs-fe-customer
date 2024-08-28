import { CloseIcon, MapPinIcon } from "@/assets/icons";
import CourtImage from "@/assets/img/court-image.jpg";
import { ICourtCenter } from "@/features/centers/types";
import { convertSlugURL } from "@/libs/helper";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import { Image } from "@mantine/core";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";
export default function CenterCardMap({
  center,
  onClickCloseIcon,
}: {
  center: ICourtCenter;
  onClickCloseIcon?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) {
  const navigate = useNavigate();

  const listImage = useMemo(() => {
    const list = center.listMedia;
    const listImage = list.map(() => {
      return { url: CourtImage, id: uuidv4() };
    });
    if (listImage?.length === 0)
      return [
        {
          url: CourtImage,
          id: uuidv4(),
        },
      ];
    return listImage;
  }, [center.listMedia]);

  return (
    <div
      className={twMerge(
        "w-full bg-white rounded-2xl text-black !shadow-[0px_5px_15px_rgba(0,0,0,0.35)] relative z-[100000]",
      )}
    >
      <div
        ref={(ref) => ref && google.maps.OverlayView.preventMapHitsFrom(ref as Element)}
        onClick={() => {
          navigate(`/center/${convertSlugURL(center.courtCenterName)}/${center.id}`);
        }}
        className={twMerge(
          "flex flex-col w-full gap-y-2 font-medium text-sm cursor-pointer p-0 relative",
        )}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClickCloseIcon && onClickCloseIcon(e);
          }}
          className="bg-white absolute top-3 left-3 z-10 h-6 w-6 flex items-center justify-center rounded-[50%]"
        >
          <CloseIcon styles={{ fill: "black", width: "16px", height: "16px" }} />
        </button>

        <Carousel
          withIndicators
          classNames={{
            root: "group overflow-hidden rounded-2xl rounded-es-none rounded-ee-none",
            control: "data-[inactive]:opacity-0 data-[inactive]:cursor-default",
            controls: "transition-opacity opacity-0 group-hover:opacity-100",
            indicator: "w-3 h-1 transition-all data-[active]:w-5",
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {listImage.map((item) => (
            <CarouselSlide key={item.id}>
              <Image
                src={item.url}
                alt="center"
                className="rounded-2xl rounded-es-none rounded-ee-none"
              />
            </CarouselSlide>
          ))}
        </Carousel>

        <div className={twMerge("flex flex-col gap-y-2 p-3 pt-0")}>
          <div className="flex items-center justify-between font-semibold text-[15px]">
            <p className="truncate max-w-[65%]">{center.courtCenterName}</p>
          </div>
          <p className="line-clamp-2">{center.description || "Trống"}</p>
          <div className="flex items-center">
            <MapPinIcon styles={{ minWidth: "20px", minHeight: "20px", stroke: "#B0B3B8" }} />
            <p className="ml-2 line-clamp-1">{center.address || "Việt Nam"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
