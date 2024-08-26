import { ICourtCenter } from "@/features/centers/types";
import StudioCardMap from "@/features/studios/components/StudioListLocation/StudioCardMap";
import { useCenterPinStore } from "@/store/componentStore";
import { OverlayViewF } from "@react-google-maps/api";
import { memo } from "react";
import { twMerge } from "tailwind-merge";
const StudioCardOverlay = ({
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
            "studio-overlay-view absolute bottom-0 translate-x-[calc(0%+37.8631px)] translate-y-[calc(50%+0px)] font-sans ",
            positionInfo,
          )}
        >
          <div className="w-80">
            <StudioCardMap onClickCloseIcon={onClickCloseIcon} center={center} />
          </div>
        </div>
      )}
    </OverlayViewF>
  );
};

const MemoizedComponent = memo(
  StudioCardOverlay,
  (prevProps, nextProps) => prevProps.center?.id === nextProps.center?.id,
);

export default MemoizedComponent;
