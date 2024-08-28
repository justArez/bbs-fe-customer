import CenterCardMap from "@/features/centers/components/CenterListLocation/CenterCardMap";
import { ICourtCenter } from "@/features/centers/types";
// import CenterCardOverlay from "@/features/map/components/CenterListPin/C";
import { useCenterPinStore } from "@/store/componentStore";
import { OverlayViewF } from "@react-google-maps/api";
import { memo } from "react";
import { twMerge } from "tailwind-merge";
const CenterCardOverlay = ({
  center,
  onClickCloseIcon,
}: {
  center: ICourtCenter | null;
  onClickCloseIcon: (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined) => void;
}) => {
  const { positionInfo } = useCenterPinStore();

  return (
    <OverlayViewF
      mapPaneName="floatPane"
      position={{ lat: Number(center?.latitude) || 0, lng: Number(center?.longitude) || 0 }}
      getPixelPositionOffset={(width, height) => {
        return {
          x: -(width / 2),
          y: -(height / 2),
        };
      }}
    >
      {center && (
        <div
          className={twMerge(
            "absolute bottom-0 translate-x-[calc(0%+37.8631px)] translate-y-[calc(50%+0px)] font-sans ",
            positionInfo,
          )}
        >
          <div className="w-80 h-80">
            <CenterCardMap center={center} onClickCloseIcon={onClickCloseIcon} />
          </div>
        </div>
      )}
    </OverlayViewF>
  );
};

const MemoizedComponent = memo(
  CenterCardOverlay,
  (prevProps, nextProps) => prevProps.center?.id === nextProps.center?.id,
);

export default MemoizedComponent;
