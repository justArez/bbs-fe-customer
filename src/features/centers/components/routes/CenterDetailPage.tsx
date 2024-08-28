// import { useLocation, useNavigate, useParams } from "react-router";
import ImageListCenter from "../ImageListCenter";
import { useGetCenter } from "../../api";
import { lazy, Suspense, useState } from "react";
import CenterIntroCard from "../CenterIntroCard";
import { LoadingOverlay } from "@mantine/core";

const Editor = lazy(() => import("@/components/Editor"));
import CenterImage from "@/assets/img/court-image.jpg";

const listMedia = [CenterImage, CenterImage, CenterImage];

export default function CenterDetailPage() {
  // const { centerId } = useParams();
  const { data, isLoading } = useGetCenter("1");

  // const location = useLocation();
  // const navigate = useNavigate();

  const [tab] = useState<{
    detail: boolean;
    testimonial: boolean;
  }>({ detail: true, testimonial: false });
  return (
    <div className="pb-16">
      <div className="my-6 mx-auto 2xl:w-[1372px] flex flex-col gap-y-6 w-[calc(100%-2rem)] sm:w-[calc(100%-4rem)]">
        <ImageListCenter listImage={listMedia || []} isLoading={isLoading} />
        {data && (
          <div className="flex flex-col gap-y-8 font-sans">
            <CenterIntroCard center={data} />
            <div className="flex gap-x-4">
              <button
                className={`text-base font-semibold ${tab?.detail ? "text-primary" : "text-gray-400"}`}
              >
                Giới thiệu
              </button>
            </div>
            {tab?.detail && (
              <Suspense fallback={<LoadingOverlay />}>
                <Editor editable={false} text={data.description || ""} />
              </Suspense>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
