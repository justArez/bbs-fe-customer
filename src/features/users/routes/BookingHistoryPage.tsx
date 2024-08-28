import { useMemo } from "react";
import { useGetBookingHistory } from "../api";
import { ColumnDef, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { IBookingHistory } from "../types";
import { Chip, Text } from "@mantine/core";
import { numbertoPrice } from "@/libs/helper";
import TableForm from "@/components/TableForm";
import { useAuthStore } from "@/store/authStore";

export default function BookingHistoryPage() {
  const { accountType } = useAuthStore();
  const { data } = useGetBookingHistory(accountType?.id || null);

  const columns = useMemo<ColumnDef<IBookingHistory>[]>(
    () => [
      {
        accessorKey: "courtCenterName",
        header: "Tên center",
        cell: ({ row }) => {
          return <Text className="text-sm font-semibold">{row.original.courtCenterName}</Text>;
        },
      },
      {
        accessorKey: "courtName",
        header: "Tên sân",
        cell: ({ row }) => {
          return <Text className="text-sm font-semibold">{row.original.courtName}</Text>;
        },
      },
      {
        accessorKey: "bookingStartDate",
        header: "Ngày đặt",
        cell: ({ row }) => {
          return (
            <Text className="text-sm font-semibold">
              {new Date(row.original.bookingStartDate * 1000).toLocaleDateString()}
            </Text>
          );
        },
      },
      {
        accessorKey: "bookingAmount",
        header: "Số tiền cần thanh toán",
        cell: ({ row }) => {
          return (
            <Text className="text-sm font-semibold">
              {numbertoPrice(row.original.bookingAmount)}
            </Text>
          );
        },
      },
      {
        accessorKey: "bookingStatus",
        header: "Trạng thái",
        cell: (cellContext) => {
          return (
            <Chip
              color={
                cellContext.row.original.bookingStatus === "NOT_PAID"
                  ? "gray"
                  : cellContext.row.original.bookingStatus === "CANCELLED"
                    ? "red"
                    : "green"
              }
              size="sm"
            >
              {cellContext.row.original.bookingStatus}
            </Chip>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data],
  );

  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => (row.bookingStartDate + row.bookingAmount).toString(),
  });

  return (
    <div className="w-full flex justify-center">
      <TableForm table={table} />
    </div>
  );
}
