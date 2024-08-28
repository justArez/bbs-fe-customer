import { MapPinIcon } from "@/assets/icons";
import CourtImage from "@/assets/img/court-image.jpg";
import { ICourtCenter } from "@/features/centers/types";
import { convertSlugURL } from "@/libs/helper";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import { Image } from "@mantine/core";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";
export default function CenterCardInfo({
  center,
  isSlide = false,
}: {
  center: ICourtCenter;
  isSlide?: boolean;
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
      className={twMerge("group w-full hover:bg-green-100 transition-colors rounded-2xl shadow-lg")}
    >
      <div
        onClick={() => navigate(`/center/${convertSlugURL(center.courtCenterName)}/${center.id}`)}
        className={twMerge("p-3 flex flex-col w-full gap-y-2 font-medium text-sm cursor-pointer")}
      >
        <Carousel
          withIndicators
          classNames={{
            root: "overflow-hidden rounded-2xl ",
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
                className="w-full h-[200px] object-cover rounded-2xl "
              />
            </CarouselSlide>
          ))}
        </Carousel>

        <div className={twMerge("flex flex-col gap-y-2 w-full max-w-full", isSlide && "p-3 pt-0")}>
          <div className="flex items-center justify-between font-semibold text-[15px] w-full max-w-full'">
            <p className="max-w-[65%]">{center.courtCenterName}</p>
          </div>
          <p className="line-clamp-2">{center.description || "test nhé"}</p>
          <div className="flex items-center">
            <MapPinIcon styles={{ minWidth: "20px", minHeight: "20px", stroke: "#B0B3B8" }} />
            <p className="ml-2 line-clamp-1">{center.address || "Việt Nam"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
