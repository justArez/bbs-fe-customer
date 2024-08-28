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
  size?: number;
  owners?: string[];
}

export interface ICourtTimeSLotFilter {
  timeSlotIds: number[];
  courtId: number | null;
  centerId?: number | null;
  date: string | null;
}

export interface ICourtTimeSLotAvailable {
  timeSlots: ICourtTimeSlot[];
  courts: ICourt[];
}

export interface ICourtTimeSlot {
  id: number;
  start: string;
  end: string;
}

export interface ICenterPagination extends IPagination<ICourtCenter> {}

export interface ICourt {
  id: number;
  courtCenterId: number;
  courtName: string;
  updatedBy: string;
  createdAt: number;
  updatedAt: number;
  pricePerSlot: number;
  image?: string;
}
