import * as React from 'react';
import '../App.css';

import { Alert, Autocomplete, Box, Snackbar, TextField, Typography } from '@mui/material';
import GridStatistics from './GridStatistics';

function Statistics(props) {

    const [openSnackBarKo, setOpenSnackBarKo] = React.useState(false);
    const [errorCode, setErrorCode] = React.useState()

    const handleCloseSnackBarKo = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setErrorCode()
        setOpenSnackBarKo(false);
    };

    return <>
        <Typography style={{ marginTop: "1rem", marginLeft: "1rem" }} variant="h4">Statistics</Typography>
        <Box className="centered" sx={{ height: "85vh", width: "80vh", marginTop: "3rem" }}>
            <Autocomplete
                id="combo-box-demo"
                style={{ marginBottom: "2rem" }}
                options={props.challenges}
                className='centered'
                getOptionLabel={(option) => option.name}
                renderInput={(params) => <TextField {...params} label="Choose a challenge" variant="standard" />}
                onChange={(event, value) => {
                    if (value !== null) {
                        props.setSelectedChallenge(value)
                        props.fetchStatistics(value)
                    }
                }}
            />
            {
                props.personalStatistics !== null && props.personalStatistics.length === 0 && <Alert severity="info">You have no content for this challenge!</Alert>
            }
            {
                props.personalStatistics !== null && props.personalStatistics.length > 0 && <GridStatistics space={6} statistics={props.personalStatistics} />
            }
        </Box>
        <Snackbar open={openSnackBarKo} autoHideDuration={5000} onClose={handleCloseSnackBarKo}>
            <Alert onClose={handleCloseSnackBarKo} severity="error" sx={{ width: '100%' }}>
                Something went wrong! {errorCode}
            </Alert>
        </Snackbar>
    </>
}

export default Statistics;