import dayjs from "dayjs";
import { ICourtCenter } from "../../types";
import { twMerge } from "tailwind-merge";
import { useState } from "react";

const shifts = [
  {
    id: 1,
    start: "2022-12-12T08:00:00",
    end: "2022-12-12T10:00:00",
  },
  {
    id: 2,
    start: "2022-12-12T10:00:00",
    end: "2022-12-12T12:00:00",
  },
  {
    id: 3,
    start: "2022-12-12T14:00:00",
    end: "2022-12-12T16:00:00",
  },
  {
    id: 4,
    start: "2022-12-12T16:00:00",
    end: "2022-12-12T18:00:00",
  },
  {
    id: 5,
    start: "2022-12-12T18:00:00",
    end: "2022-12-12T20:00:00",
  },
];

export default function BookingModal({ center }: { center: Partial<ICourtCenter> }) {
  const [selectedShifts, setSelectedShifts] = useState<number[]>([]);
  return (
    <div className="flex flex-col gap-y-3">
      <p>Thông tin sân:</p>
      <p>Trung tâm: {center.courtCenterName}</p>
      <p>Địa chỉ: {center.address}</p>
      <div>
        <h4 className="text-lg font-semibold mb-1">Lựa chọn khung giờ</h4>

        <div className="mt-3">
          {shifts && shifts.length > 0 ? (
            <div className="flex gap-3 flex-wrap">
              {shifts.map((s) => (
                <button
                  key={s.id}
                  className={twMerge(
                    "rounded-md px-4 py-2 text-black font-semibold text-base hover:bg-green-500 hover:text-white transition-colors",
                    selectedShifts.some((shift) => shift === s.id) ? "bg-green-500 text-white" : "bg-white shadow-sm",
                  )}
                  onClick={() => {
                    const shiftIndex = selectedShifts.findIndex((shift) => shift === s.id)
                    if (shiftIndex < 0) {
                      setSelectedShifts([...selectedShifts, s.id])
                    } else {
                      setSelectedShifts((selectedShifts) => {
                        return selectedShifts.splice(shiftIndex, 1)
                      })
                    }
                  }}
                >
                  {dayjs(s.start).format("HH:mm")}
                </button>
              ))}
            </div>
          ) : (
            <p className="italic text-sm">
              Không có khung giờ nào trong ngày. Vui lòng chọn ngày khác
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
