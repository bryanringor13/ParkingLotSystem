import { Button, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeVehicle } from '../redux/actions/parking';
import { RootState } from '../redux/reducers'

const Vehicle = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const parking = useSelector((state: RootState) => state.parking)

    const parkExitHandler = (slot_id: any, vehicle_id: any) => {
        // console.log('Slot ID: ', slot_id)
        dispatch(removeVehicle({
            slot_id,
            vehicle_id
        }))
    }

    return (
        <div className={classes.vehicle}>
            List of Vehicles:
            {parking.vehicles.map((vehicle, index) => (
                <p key={index}>
                    Vehicle ID: {vehicle.vehicle_id}<br />
                    Vehicle Type: {vehicle.vehicle_type}<br />
                    Parking Slot ID: {vehicle.parking_slot_id}<br />
                    Date Entered: {vehicle.date_entry} <br />
                    Date Exited: {vehicle.date_exit}<br />
                    Last Entrance: {vehicle.parking_entry}<br />
                    Hours: {vehicle.hours}<br />
                    Total Bill: {vehicle.bill}<br />
                    {vehicle.bill === 0 && <>
                        Action: <Button color="secondary" size='small' onClick={() => parkExitHandler(vehicle.parking_slot_id, vehicle.vehicle_id)}>Exit</Button>
                    </>}
                </p>
            ))}
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    vehicle: {
      padding: theme.spacing(2),
    }
}));


export default Vehicle
