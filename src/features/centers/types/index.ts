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
  image: string;
  openTime: string;
  closeTime: string;
  timeslots: ITimeSlot[];
}

export interface ITimeSlot {
  id: number;
  startTime: string;
  endTime: string;
  createdBy: string;
  createdAt: number;
  updatedAt: number;
}

export interface IFilter {
  neLat?: number;
  neLng?: number;
  swLat?: number;
  swLng?: number;
  // viewPortNE?: {
  //   lat: number;
  //   lng: number;
  // };
  // viewPortSW?: {
  //   lat: number;
  //   lng: number;
  // };
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

export interface IAvailableSlot {
  id: number;
  startTime: string;
  endTime: string;
  createdBy: string;
  createdAt: number;
  updatedAt: number;
}

export interface ICourtTimeSLotAvailable {
  availableSlots: IAvailableSlot[];
  courtCenterId: number;
  courtName: string;
  createdAt: number;
  createdBy: string;
  id: number;
  pricePerSlot: number;
  updatedAt: number;
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
