import { ICourtCenter } from "@/features/centers/types";
import StudioPin from "./StudioPin";
import StudioCardOverlay from "./StudioCardOverlay";
import { useGoogleMapStore, useCenterPinStore } from "@/store/componentStore";
import { useEffect } from "react";
import { adjustPosition } from "@/libs/helper/googleMapHelper";
export default function CenterListPin({ centers }: { centers: ICourtCenter[] }) {
  const { centerPin, setCenterPin, setPositionInfo } = useCenterPinStore();
  const { map } = useGoogleMapStore();
  const centerList =
    centerPin && !centers.find((center) => center.id === centerPin.id)
      ? [...centers, centerPin]
      : centers;

  useEffect(() => {
    return () => setCenterPin(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {centerList.map((center) => {
        return (
          <StudioPin
            isSelect={center.id === centerPin?.id}
            key={center.id}
            studio={center}
            propsRoot={{
              onClick: (e) => {
                setCenterPin(center);
                e.stopPropagation();
                if (map)
                  setPositionInfo(
                    adjustPosition(
                      { lat: Number(center.latitude), lng: Number(center.longitude) },
                      map,
                    ),
                  );
              },
            }}
          />
        );
      })}
      <StudioCardOverlay onClickCloseIcon={() => setCenterPin(null)} center={centerPin} />
    </>
  );
}
