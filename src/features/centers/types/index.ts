import { IPagination } from "@/common/types";

export interface ICourtCenter {
  address: string;
  courtCenterName: string;
  courtOwnerId: number;
  createdAt: string;
  createdBy: string;
  id: number;
  description: string;
  latitude: number;
  longitude: number;
  updatedAt: string;
  updatedBy: string;
  logo: string;
  listMedia: string[];
  workingTime: IWorkingTime[];
}

export interface IWorkingTime {
  dayOfWeek: number;
  closeAt: string;
  openAt: string;
}

export interface IFilter {
  viewPortNE?: {
    lat: number;
    lng: number;
  };
  viewPortSW?: {
    lat: number;
    lng: number;
  };
  page?: number;
  pageSize?: number;
  owners?: string[];
}

export interface ICenterPagination extends IPagination<ICourtCenter> { }
