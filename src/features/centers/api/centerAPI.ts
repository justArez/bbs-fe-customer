import * as httpRequest from "@/libs/axios";
import * as httpAuth from "@/libs/axios-auth";
import {
  IBookingReq,
  IBookingRes,
  ICourtCenter,
  ICourtTimeSLotAvailable,
  ICourtTimeSLotFilter,
  IFilter,
} from "../types";
import { useMutation, useQuery } from "@tanstack/react-query";

export const getCenter = async (id: string): Promise<ICourtCenter | null> => {
  if (id !== "") {
    try {
      const response: ICourtCenter = await httpRequest.get(`/center/${id}`);
      return response;
    } catch (_error) {
      console.log(_error);
    }
  }
  return null;
};

export const paymentBooking = async (data: {
  bookingId: number;
  price: number;
}): Promise<string> => {
  try {
    const response = await httpAuth.get("/payment/pay", {
      params: data,
    });
    return response;
  } catch (e: any) {
    throw new Error(e);
  }
};

const getListCenter = async (filter: IFilter): Promise<ICourtCenter[]> => {
  try {
    const response: ICourtCenter[] = await httpRequest.get("/center/nearby", {
      params: filter,
    });

    return response;
  } catch (e: any) {
    throw new Error(e);
  }
};

const getAvaliableCourtAndTimeSLot = async (
  filter: ICourtTimeSLotFilter,
): Promise<ICourtTimeSLotAvailable[]> => {
  try {
    const response = await httpAuth.post("/court/available", filter);
    return response;
  } catch (e: any) {
    throw new Error(e);
  }
};

const bookingCourt = async (data: IBookingReq): Promise<IBookingRes> => {
  try {
    const response = await httpAuth.post("/booking/place-order", data);
    return response;
  } catch (e: any) {
    throw new Error(e);
  }
};

export const useGetListCenter = (filter: IFilter) => {
  return useQuery({
    queryKey: ["centers", filter],
    queryFn: () => getListCenter(filter),
    staleTime: Infinity,
    enabled: () => JSON.stringify(filter) !== "{}",
  });
};

export const useGetCenter = (id: string) => {
  return useQuery({
    queryKey: ["center", id],
    queryFn: () => getCenter(id),
    staleTime: Infinity,
    enabled: () => id !== "",
  });
};

export const useGetAvaliableCourtAndTimeSLot = (filter: ICourtTimeSLotFilter) => {
  return useQuery({
    queryKey: ["court/available", filter],
    queryFn: () => getAvaliableCourtAndTimeSLot(filter),
    staleTime: Infinity,
    enabled: () => JSON.stringify(filter) !== "{}",
  });
};

export const useBookingCourtMutation = (
  handleFn: {
    onError?: (error: unknown, variables: IBookingReq, context: unknown) => void;
    onSuccess?: (data: IBookingRes, variables: IBookingReq, context: unknown) => void;
    onMutate?: (variables: IBookingReq) => Promise<IBookingRes>;
  },
  retry?: number,
) => {
  return useMutation({
    mutationFn: (data: IBookingReq) => bookingCourt(data),
    onError: handleFn.onError,
    onSuccess: handleFn.onSuccess,
    onMutate: handleFn.onMutate,
    retry,
  });
};

export const usePaymentBookingMutation = (
  handleFn: {
    onSuccess?: (
      data: string,
      variables: { bookingId: number; price: number },
      context: unknown,
    ) => void;
    onError?: (
      error: unknown,
      variables: { bookingId: number; price: number },
      context: unknown,
    ) => void;
    onMutate?: (variables: { bookingId: number; price: number }) => Promise<IBookingRes>;
  },
  retry?: number,
) => {
  return useMutation({
    mutationFn: (data: { bookingId: number; price: number }) => paymentBooking(data),
    onError: handleFn.onError,
    onSuccess: handleFn.onSuccess,
    onMutate: handleFn.onMutate,
    retry,
  });
};
