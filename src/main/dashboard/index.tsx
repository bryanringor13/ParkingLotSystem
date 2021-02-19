import { makeStyles, Paper } from '@material-ui/core';
import React from 'react'
import NewVehicle from '../../components/NewVehicle';
import Vehicle from '../../components/Vehicle';

const Dashboard = () => {
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <h2>Parking Lot System</h2>
            <NewVehicle />
            <Vehicle />
        </Paper>
    )
}

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
    formControl: {
        margin: theme.spacing(1),
        width: '100%'
    }
}));

export default Dashboard
