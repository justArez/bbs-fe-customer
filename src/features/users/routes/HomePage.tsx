import { usePlaceDetail } from "@/features/map/api/mapAPI";
import { useEffect } from "react";

export default function HomePage() {
  const { data } = usePlaceDetail({
    placeId: "ChIJN1t_tDeuEmsRUsoyG83frY4",
  });

  useEffect(() => {
    console.log(data);
  }, [data]);
  return <div></div>;
}
