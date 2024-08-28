import dayjs from "dayjs";
import { IAvailableSlot, ICourtCenter } from "../../types";
import { twMerge } from "tailwind-merge";
import { useEffect, useMemo, useState } from "react";
import { Button, Card, Image, Select } from "@mantine/core";
import CourtImage from "@/assets/img/court-image.jpg";
import { useGetAvaliableCourtAndTimeSLot } from "../../api";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import { numbertoPrice } from "@/libs/helper";

export default function BookingModal({ center }: { center: Partial<ICourtCenter> }) {
  const [selectedShifts, setSelectedShifts] = useState<number[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(dayjs().format("YYYY-MM-DD"));
  const [selectedCourt, setSelectedCourt] = useState<number | null>(null);
  const [listTimeSlot, setListTimeSlot] = useState<IAvailableSlot[]>([]);
  const listSevenDay = useMemo(
    () => Array.from({ length: 7 }, (_, i) => dayjs().add(i, "day").format("YYYY-MM-DD")),
    [],
  );
  const { data } = useGetAvaliableCourtAndTimeSLot({
    timeSlotIds: selectedShifts,
    centerId: center.id!,
    date: selectedDate ?? dayjs().format("YYYY-MM-DD"),
    courtId: selectedCourt,
  });

  useEffect(() => {
    if (data) {
      // loop through data to get the list of time slot by merge start and end time
      const listSlot: IAvailableSlot[] = [];
      data.forEach((d) => {
        d.availableSlots.forEach((slot) => {
          !listSlot.some((s) => s.id === slot.id) && listSlot.push(slot);
        });
      });
      setListTimeSlot(listSlot);
    }
  }, [data]);

  return (
    <div className="flex flex-col gap-y-3">
      <h1 className="font-semibold text-xl">Thông tin sân:</h1>
      <div className="font-medium text-lg">
        <p>Trung tâm: {center.courtCenterName}</p>
        <p>Địa chỉ: {center.address}</p>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-1">Lựa chọn ngày</h2>
        <div className="my-3">
          <Select
            onChange={(value) => setSelectedDate(value)}
            placeholder="Chọn ngày trong vòng 1 tuần"
            data={listSevenDay}
          ></Select>
        </div>
        <h2 className="text-lg font-semibold mb-1">Lựa chọn khung giờ</h2>
        <div className="my-3">
          {listTimeSlot && listTimeSlot.length > 0 ? (
            <div className="flex gap-3 flex-wrap">
              {listTimeSlot.map((s) => (
                <button
                  key={s.id}
                  className={twMerge(
                    "rounded-md px-4 py-2 text-black font-semibold text-base hover:bg-gray-300 transition-colors",
                    selectedShifts.some((shift) => shift === s.id)
                      ? "!bg-green-500 text-white"
                      : "bg-white shadow-lg",
                  )}
                  onClick={() => {
                    const shiftIndex = selectedShifts.findIndex((shift) => shift === s.id);
                    if (shiftIndex < 0) {
                      setSelectedShifts([...selectedShifts, s.id]);
                    } else {
                      setSelectedShifts(selectedShifts.filter((shift) => shift !== s.id));
                    }
                  }}
                >
                  {s.startTime} - {s.endTime}
                </button>
              ))}
            </div>
          ) : (
            <p className="italic text-sm">
              Không có khung giờ nào trong ngày. Vui lòng chọn ngày khác
            </p>
          )}
        </div>
        <h2 className="text-lg font-semibold mb-1">Danh sách sân còn trống</h2>
        <div className="my-3">
          <Carousel
            withIndicators
            slideSize="50%"
            slideGap="md"
            loop
            align="start"
            slidesToScroll={2}
          >
            {data &&
              data.map((court) => (
                <CarouselSlide key={court.id}>
                  <Card
                    onClick={() =>
                      selectedCourt !== court.id
                        ? setSelectedCourt(court.id)
                        : setSelectedCourt(null)
                    }
                    classNames={{
                      root: twMerge(
                        "hover:bg-gray-300 transition-colors cursor-pointer",
                        selectedCourt === court.id ? "!bg-green-300" : "bg-white",
                      ),
                    }}
                    shadow="xs"
                    className="w-80"
                  >
                    <Image src={CourtImage} alt="court" />
                    <div className="p-4">
                      <p className="font-semibold text-lg s">{court.courtName}</p>
                      <p className="text-sm">Giá mỗi slot: {numbertoPrice(court.pricePerSlot)}</p>
                    </div>
                  </Card>
                </CarouselSlide>
              ))}
          </Carousel>
        </div>
        <div className="my-10 flex justify-center">
          <Button size="lg">Đặt sân ngay</Button>
        </div>
      </div>
    </div>
  );
}
