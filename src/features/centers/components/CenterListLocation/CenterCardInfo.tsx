import { CloseIcon, MapPinIcon, StarIcon } from "@/assets/icons";
import StudioCardImage from "@/assets/img/studio-card.jpg";
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
  onClickCloseIcon,
}: {
  center: ICourtCenter;
  isSlide?: boolean;
  onClickCloseIcon?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) {
  const navigate = useNavigate();
  const listImage = useMemo(() => {
    const list = center.listMedia;
    const listImage = list.map((item) => {
      return { url: item, id: uuidv4() };
    });
    if (listImage?.length === 0)
      return [
        {
          url: StudioCardImage,
          id: uuidv4(),
        },
      ];
    return listImage;
  }, [center.listMedia]);
  return (
    <div
      className={twMerge(
        "w-full bg-studio-card-gray-dark shadow-shadow-dropdown rounded-2xl ",
        isSlide ? "bg-white text-black !shadow-[0px_5px_15px_rgba(0,0,0,0.35)]" : "",
      )}
    >
      <div
        onClick={() => navigate(`/studio/${convertSlugURL(center.courtCenterName)}/${center.id}`)}
        className={twMerge(
          "p-3 flex flex-col w-full gap-y-2 font-medium text-sm cursor-pointer",
          isSlide && "p-0 relative",
        )}
      >
        {isSlide && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClickCloseIcon && onClickCloseIcon(e);
            }}
            className="bg-white absolute top-3 left-3 z-10 h-6 w-6 flex items-center justify-center rounded-[50%]"
          >
            <CloseIcon styles={{ fill: "black", width: "16px", height: "16px" }} />
          </button>
        )}

        <Carousel>
          {listImage.map((item) => (
            <CarouselSlide key={item.id}>
              <Image
                src={item.url}
                alt="studio"
                className="w-full h-[200px] object-cover rounded-2xl"
              />
            </CarouselSlide>
          ))}
        </Carousel>

        <div className={twMerge("flex flex-col gap-y-2 w-full max-w-full", isSlide && "p-3 pt-0")}>
          <div className="flex items-center justify-between font-semibold text-[15px] w-full max-w-full'">
            <p className="name-studio max-w-[65%]">{center.courtCenterName}</p>
            <div className="flex items-center">
              <StarIcon />
              <p className="ml-1 font-medium text-sm">{"0.00"}</p>
            </div>
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
