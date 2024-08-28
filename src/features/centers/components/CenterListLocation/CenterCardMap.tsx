import { CloseIcon, MapPinIcon, StarIcon } from "@/assets/icons";
import StudioCardImage from "@/assets/img/studio-card.jpg";
import { ImageSlider } from "@/components/common/Image";
import { ICourtCenter } from "@/features/centers/types";
import { convertSlugURL } from "@/libs/helper";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export default function CenterCardMap({
  center,
  onClickCloseIcon,
}: {
  center: ICourtCenter;
  onClickCloseIcon?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) {
  const navigate = useNavigate();
  return (
    <div
      className={twMerge(
        "w-full bg-white rounded-2xl text-black !shadow-[0px_5px_15px_rgba(0,0,0,0.35)] relative z-[100000]",
      )}
    >
      <div
        ref={(ref) => ref && google.maps.OverlayView.preventMapHitsFrom(ref as Element)}
        onClick={() => {
          navigate(`/studio/${convertSlugURL(center.courtCenterName)}/${center.id}`);
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
        <ImageSlider
          className="rounded-2xl rounded-es-none rounded-ee-none"
          src={center.logo && center.logo !== "" ? center.logo : StudioCardImage}
        />
        <div className={twMerge("flex flex-col gap-y-2 p-3 pt-0")}>
          <div className="flex items-center justify-between font-semibold text-[15px]">
            <p className="name-studio truncate max-w-[65%]">{center.courtCenterName}</p>
            <div className="flex items-center">
              <StarIcon />
              <p className="ml-1 font-medium text-sm">{"0.00"}</p>
            </div>
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
