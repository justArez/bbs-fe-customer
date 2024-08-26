import * as httpRequest from "@/libs/axios";
import * as httpAuth from "@/libs/axios-auth";
import { ICenterPagination, IFilter } from "../types";
import { useQuery } from "@tanstack/react-query";

const getListCenter = async (filter: IFilter): Promise<ICenterPagination> => {
  try {
    const response: ICenterPagination = await httpRequest.post("/centers", filter);
    return response;
  } catch (e: any) {
    throw new Error(e);
  }
};

export const useGetListCenter = (filter: IFilter) => {
  return useQuery({
    queryKey: ["studios", filter],
    queryFn: () => getListCenter(filter),
    staleTime: Infinity,
  });
};
