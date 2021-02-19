import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/reducers'

const Parking = () => {
    const parking = useSelector((state: RootState) => state.parking)
    const [parkingLot, setParkingLot] = useState<any[]>([])

    useEffect(() => {
        async function updateParkingLotHandler() {
            let updateParkingSlot: any[] = [], parkingSlot: any[] = []
    
            updateParkingSlot = await parking.parkingEntries.map((entry, index) => {
                parkingSlot = entry.slots.map((slot: any, index: any) => {
                    return {
                        slot_status: parking.parkingSlots.filter(parkSlot => parkSlot.id === slot)[0],
                        slot_type: parking.parkingSlotsType[slot-1],
                        slot_type_size: parking.vehicleTypes[parking.parkingSlotsType[slot-1]]
                    }
                })
                return {
                    name: entry.name,
                    parking_slots: parkingSlot,
    
                }
            })
    
            setParkingLot(updateParkingSlot)
        }

        updateParkingLotHandler()
    }, [parking])

    return (
        <div>
            Parking Lot <br />
            {parkingLot.map((parking, index) => (
                <div key={index}>
                    <h4>{parking.name}</h4>
                    {parking.parking_slots.map((slot: any, index: any) => (
                        <div key={index}>
                            <p>Parking Slot {slot.slot_status.id}: ({slot.slot_type}) {slot.slot_type_size}<br />
                            Vehicle: {!!slot.slot_status.vehicle ? `ID: ${slot.slot_status.vehicle.vehicle_id} | Entered: ${slot.slot_status.vehicle.date_entry}` : 'none'}</p>
                        </div>
                    ))}
                    <br />
                </div>
            ))}
        </div>
    )
}

export default Parking
