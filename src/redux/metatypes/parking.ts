export enum ParkingTypes {
    ADD_PARKING = 'PARKING/ADD_PRODUCT',
    ADD_PARKING_SLOT = 'PARKING/EDIT_PRODUCT',
    ADD_PARKING_TYPES = 'PARKING/DELETE_PRODUCT',
    ADD_NEW_VEHICLE = 'PARKING/ADD_NEW_VEHICLE',
    REMOVE_VEHICLE = 'PARKING/REMOVE_VEHICLE'
}

export interface ParkingState {
    readonly vehicleTypes: any[];
    readonly parkingEntries: any[];
    readonly parkingSlots: any[];
    readonly parkingSlotsType: any[];
    readonly vehicles: any[];
    readonly rate: any[];
}
  
export interface ParkingAction {
    type: string;
    payload: any;
}