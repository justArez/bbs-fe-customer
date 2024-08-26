import SearchBarLocation from "@/features/map/components/SearchBarLocation/SearchBarLocation";

export default function HomePage() {
  return (
    <div className="find-place-wrapper">
      <div className="container text-white">
        <div className="flex items-center gap-x-4 min-h-[500px]">
          <div className="w-8/12 flex flex-col gap-y-3">
            <p className="text-light-green text-xl">Ứng dụng đặt sân cầu lông tốt nhất hiện nay</p>
            <h1 className="font-bold text-5xl capitalize">Tìm kiếm địa điểm gần nhất</h1>
            <h1 className="font-bold text-5xl capitalize">
              Đặt <span className="text-light-green">sân cầu lông</span> nhanh chóng
            </h1>
            <p className="text-xl">
              Giải phóng tiềm năng thể thao của bạn với huấn luyện viên chuyên nghiệp, cơ sở vật
              chất hiện đại và chương trình đào tạo cá nhân.
            </p>
            <div className="mt-4">
              <SearchBarLocation />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
