import * as httpRequest from "@/libs/axios";
import {
  ICenterPagination,
  ICourtCenter,
  ICourtTimeSLotAvailable,
  ICourtTimeSLotFilter,
  IFilter,
} from "../types";
import { useQuery } from "@tanstack/react-query";

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

const getListCenter = async (filter: IFilter): Promise<ICenterPagination> => {
  try {
    const response: ICenterPagination = await httpRequest.post("/centers", filter);
    return response;
  } catch (e: any) {
    throw new Error(e);
  }
};

const getAvaliableCourtAndTimeSLot = async (
  filter: ICourtTimeSLotFilter,
): Promise<ICourtTimeSLotAvailable> => {
  try {
    const response = await httpRequest.post("/court/available", filter);
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
