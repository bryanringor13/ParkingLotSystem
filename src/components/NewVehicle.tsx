import { Button, FormControl, InputLabel, makeStyles, NativeSelect, Grid } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addNewVehicle } from '../redux/actions/parking';
import { RootState } from '../redux/reducers';



const NewVehicle = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const parking = useSelector((state: RootState) => state.parking)

    const [vehicleTypeValue, setVehicleTypeValue] = useState(0)
    const [parkingEntryValue, setParkingEntryValue] = useState(0)
    const [erroMessage, setErrorMessage] = useState('')
    
    const vehicleTypeHandler = (event: any) => {
        setVehicleTypeValue(event.target.value)
    }

    const parkingEntryHandler = (event: any) => {
        setParkingEntryValue(event.target.value)
    }

    const vehicleNewEntryHandler = () => {
        setErrorMessage('')
        let listParkSlots = parking.parkingSlots, listParkingType = parking.parkingSlotsType
        let parkingSlot = parking.parkingEntries[parkingEntryValue].slots
        let availableSlot = parkingSlot.map((slot: any, index: any) => listParkSlots.filter(parkSlot => parkSlot.id === slot)[0]).map((slotType: any) => {
            return {
                ...slotType,
                slot_type: listParkingType[slotType.id-1]
            }
        })

        let returnSlotVehicle = availableSlot.filter((availSlot: any) => vehicleTypeValue <= availSlot.slot_type && availSlot.vehicle === null)

        if(!returnSlotVehicle[0]) return setErrorMessage('No available slot')
        dispatch(addNewVehicle({
            vehicle_id: parking.vehicles.length+1,
            vehicle_type: vehicleTypeValue,
            parking_entry: parkingEntryValue,
            slots_id: returnSlotVehicle[0].id
        }))
    }

    return (
        <form noValidate>
            <Grid container spacing={1}>
                {erroMessage.length > 0 && <Grid item xs={12}>
                    <Alert severity="error">{erroMessage}</Alert>
                </Grid>}
                <Grid item xs={12} sm={6}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Types of Vehicle</InputLabel>
                        <NativeSelect
                            value={vehicleTypeValue}
                            onChange={(event: any) => vehicleTypeHandler(event)}
                            inputProps={{
                                name: 'vehicle-type',
                                id: 'vehicle-type',
                            }}
                        >
                            {parking.vehicleTypes.map((vehicle, index) => (
                                <option key={index} value={index}>{vehicle}</option>
                            ))}
                        </NativeSelect>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Parking Entry</InputLabel>
                        <NativeSelect
                        value={parkingEntryValue}
                        onChange={(event: any) => parkingEntryHandler(event)}
                        inputProps={{
                            name: 'parking-entry',
                            id: 'parking-entry',
                        }}
                        >
                            {parking.parkingEntries.map((entryPoints, index) => (
                                <option key={index} value={index}>{entryPoints.name}</option>
                            ))}
                        </NativeSelect>
                    </FormControl>
                </Grid>
            </Grid>
            
            <Button variant="contained" color="primary" fullWidth onClick={() => vehicleNewEntryHandler()}>
                Enter New Vehicle
            </Button>
        </form>
    )
}

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        width: '100%'
    }
}));

export default NewVehicle
