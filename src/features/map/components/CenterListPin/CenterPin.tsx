import { StarIcon } from "@/assets/icons";
import { ICourtCenter } from "@/features/centers";
import { OverlayViewF } from "@react-google-maps/api";
import { HTMLMotionProps, m } from "framer-motion";
import { ButtonHTMLAttributes, memo } from "react";
import { twMerge } from "tailwind-merge";

const CenterPin = ({
  center,
  isSelect,
  propsButton,
  propsRoot,
}: {
  center: ICourtCenter;
  isSelect?: boolean;
  propsButton?: ButtonHTMLAttributes<HTMLButtonElement>;
  propsRoot?: HTMLMotionProps<"div">;
}) => {
  return (
    <OverlayViewF
      position={{ lat: center.latitude, lng: center.longitude }}
      mapPaneName="overlayMouseTarget"
      getPixelPositionOffset={(width, height) => {
        return {
          x: -(width / 2),
          y: -(height / 2),
        };
      }}
    >
      <m.div
        {...propsRoot}
        className={twMerge("origin-center", propsRoot?.className || "")}
        animate={isSelect ? { scale: 1.1 } : { scale: 1 }}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", damping: 15, stiffness: 300 }}
      >
        <button
          {...propsButton}
          className={twMerge(
            "bg-button-primary text-white text-sm font-bold rounded-lg px-2 py-1 border-2 border-solid border-black flex gap-x-1 bg-green-500",
            propsButton?.className || "",
            isSelect ? "bg-black" : "",
          )}
        >
          <StarIcon
            styles={{
              fill: "white",
            }}
          />
          <span className="max-w-[4rem] truncate">{center.courtCenterName}</span>
        </button>
      </m.div>
    </OverlayViewF>
  );
};

const MemoizedComponent = memo(
  CenterPin,
  (prevProps, nextProps) => prevProps.isSelect === nextProps.isSelect,
);

export default MemoizedComponent;
