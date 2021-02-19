import { Reducer } from 'redux';
import { ParkingAction, ParkingState, ParkingTypes } from '../metatypes/parking';
import moment from 'moment';

const initialState: ParkingState = {
    vehicleTypes: ['Small', 'Medium', 'Large'],
    parkingEntries: [
        { name: '1 Entrance', slots: [1,3]},
        { name: '2 Entrance', slots: [2,4]},
        { name: '3 Entrance', slots: [3,5]},
    ],
    parkingSlots: [
        {id: 1, vehicle: null},
        {id: 2, vehicle: null},
        {id: 3, vehicle: null},
        {id: 4, vehicle: null},
        {id: 5, vehicle: null},
    ],
    parkingSlotsType: [0,2,1,1,2],
    vehicles: [],
    rate: [20,60,100]
};

const parkingReducer: Reducer<ParkingState, ParkingAction> = (state = initialState, action: ParkingAction) => {
  switch (action.type) {
        case ParkingTypes.ADD_PARKING:
            let parkEntry: any[] = []
            parkEntry = [
                ...state.parkingEntries,
                action.payload.parking
            ]
            return {
                ...state,
                parkingEntries: parkEntry
            };
        case ParkingTypes.ADD_PARKING_SLOT:
            let parkSlots: any[] = []
            parkSlots = [
                ...state.parkingSlots,
                action.payload.slots
            ]
            return {
                ...state, 
                parkingSlots: parkSlots
            };
        case ParkingTypes.ADD_PARKING_TYPES:   
            let parkSlotTypes: any[] = []
            parkSlotTypes = [
                ...state.parkingSlotsType,
                action.payload.slotsType
            ]
            return {
                ...state, 
                parkingSlotsType: parkSlotTypes
            };
        case ParkingTypes.ADD_NEW_VEHICLE:
            let parkEntrySlot: any[] = state.parkingSlots, updateVehicle: any[] = [], vehicleObj = {}
            let vehicleTypesData: any[] = state.vehicleTypes, parkingEntriesData: any[] = state.parkingEntries
            const slotIndex = parkEntrySlot.findIndex(slot => slot.id === action.payload.slots_id);
            moment.defaultFormat = "DD.MM.YYYY HH:mm";
            vehicleObj = {
                vehicle_id: action.payload.vehicle_id,
                vehicle_type: vehicleTypesData[action.payload.vehicle_type],
                parking_entry: parkingEntriesData[action.payload.parking_entry].name,
                parking_slot_id: action.payload.slots_id,
                date_entry: moment().format('YYYY-MM-DD h:mm:ss a'),
                // date_entry: moment().subtract(2, 'hours'),
                date_exit: null,
                hours: 0,
                bill: 0
            }
            updateVehicle = [
                ...state.vehicles,
                vehicleObj
            ]
            parkEntrySlot[slotIndex].vehicle = vehicleObj

            return {
                ...state, 
                parkingSlots: parkEntrySlot,
                vehicles: updateVehicle
            };
        case ParkingTypes.REMOVE_VEHICLE:
            let removeFromSlot: any[] = state.parkingSlots, paymentVehiclePost: any[] = state.vehicles, currentDate = moment(), rateList: any[] = state.rate, bill = 40, aDayRate = 5000, parkingLotType = state.parkingSlotsType
            const hoursStart = 3
            const removeSlotIndex = removeFromSlot.findIndex(slot => slot.id === action.payload.slot_id);
            removeFromSlot[removeSlotIndex].vehicle = null

            const payVehicleIndex = paymentVehiclePost.findIndex(vehicle => vehicle.vehicle_id === action.payload.vehicle_id)
            const fromDate = moment(paymentVehiclePost[payVehicleIndex].date_entry)
            const hours = currentDate.diff(moment(fromDate), 'hours')

            if(hours > hoursStart && hours < 24) {
                bill += ((hours-hoursStart)*rateList[parkingLotType[action.payload.slot_id-1]])
            }else if(hours >= 24){
                bill = aDayRate
            }

            paymentVehiclePost[payVehicleIndex].date_exit = currentDate.format('YYYY-MM-DD h:mm:ss a')
            paymentVehiclePost[payVehicleIndex].hours = hours
            paymentVehiclePost[payVehicleIndex].bill = bill
            // console.log(currentDate.diff(moment(fromDate), 'hours'))
            return {
                ...state, 
                parkingSlots: removeFromSlot,
                vehicles: paymentVehiclePost
            };
        default:
            return state;
  }
};

export default parkingReducer;