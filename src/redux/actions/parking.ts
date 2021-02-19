import { action } from 'typesafe-actions';
import { ParkingTypes } from '../metatypes/parking';

export const addNewParking = (payload: any) => action(ParkingTypes.ADD_PARKING, payload);
export const addNewParkingSlots = (payload: any) => action(ParkingTypes.ADD_PARKING_SLOT, payload);
export const addNewParkingSlotTypes = (payload: any) => action(ParkingTypes.ADD_PARKING_TYPES, payload);
export const addNewVehicle = (payload: any) => action(ParkingTypes.ADD_NEW_VEHICLE, payload);

export const removeVehicle = (payload: any) => action(ParkingTypes.REMOVE_VEHICLE, payload);