import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { PlaceData } from "@googlemaps/google-maps-services-js";
import { EPositionOverlayView } from "@/features/map/types";
import { ICourtCenter, IFilter } from "@/features/centers/types";
interface SearchLocationState {
  placeChoose: Partial<google.maps.places.AutocompletePrediction> | null;
  setPlaceChoose: (placeId: Partial<google.maps.places.AutocompletePrediction> | null) => void;
  sessionToken: google.maps.places.AutocompleteSessionToken;
  setSessionToken: () => void;
  reset: () => void;
}

export const useSearchLocationStore = create<SearchLocationState>((set) => ({
  placeChoose: null,
  setPlaceChoose: (placeChoose) => set({ placeChoose }),
  sessionToken: uuidv4() as google.maps.places.AutocompleteSessionToken,
  setSessionToken: () => set({ sessionToken: uuidv4() }),
  reset: () =>
    set({
      placeChoose: null,
      sessionToken: uuidv4() as google.maps.places.AutocompleteSessionToken,
    }),
}));

interface GoogleMapState {
  map: google.maps.Map | null;
  setMap: (map: google.maps.Map | null) => void;
  placeDetail: Partial<PlaceData> | null;
  setPlaceDetail: (placeDetail: Partial<PlaceData> | null) => void;
}

export const useGoogleMapStore = create<GoogleMapState>((set) => ({
  map: null,
  setMap: (map) => set({ map }),
  placeDetail: null,
  setPlaceDetail: (placeDetail) => set({ placeDetail }),
}));

interface CenterPinState {
  centerPin: ICourtCenter | null;
  positionInfo: EPositionOverlayView;
  setPositionInfo: (positionInfo: EPositionOverlayView) => void;
  setCenterPin: (centerPin: ICourtCenter | null) => void;
}

export const useCenterPinStore = create<CenterPinState>((set) => ({
  centerPin: null,
  positionInfo: EPositionOverlayView.CENTER,
  setPositionInfo: (positionInfo: EPositionOverlayView) => set({ positionInfo }),
  setCenterPin: (centerPin: ICourtCenter | null) => set({ centerPin }),
}));

interface FilterFormState {
  filterData: IFilter | null;
  isQuery: boolean;
  listCenter: ICourtCenter[] | null;
  setListCenter: (listCenter: ICourtCenter[] | null) => void;
  setFilterData: (filterData: IFilter | null) => void;
  setIsQuery: (isQuery: boolean) => void;
  reset: () => void;
}

export const useFilterFormStore = create<FilterFormState>((set) => ({
  filterData: null,
  isQuery: false,
  listCenter: null,
  setListCenter: (listCenter: ICourtCenter[] | null) => set({ listCenter }),
  setIsQuery: (isQuery: boolean) => set({ isQuery }),
  setFilterData: (filterData: IFilter | null) => set({ filterData }),
  reset: () => {
    set({ filterData: null, isQuery: false, listCenter: null });
  },
}));
