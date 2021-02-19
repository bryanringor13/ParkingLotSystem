import { FormControl, Grid, makeStyles, TextField } from '@material-ui/core'
import React from 'react'

const ParkSettings = () => {
    const classes = useStyles();
    return (
        <form className={classes.container} noValidate>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                    <FormControl className={classes.formControl}>
                        <TextField id="standard-basic" label="Add Parking Entry" size='small'/>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl className={classes.formControl}>
                        <TextField id="standard-basic" label="Parking Slot" size='small'/>
                    </FormControl>
                </Grid>
            </Grid>
        </form>
    )
}

const useStyles = makeStyles((theme) => ({
    container: {
        marginBottom: 20
    },
    formControl: {
        margin: theme.spacing(1),
        width: '100%'
    }
}));

export default ParkSettings
