import * as React from 'react';
import '../App.css';

import { Alert, Autocomplete, Box, TextField, Typography } from '@mui/material';
import QueryService from '../services/executeQuery';
import GridStatistics from './GridStatistics';

function Statistics(props) {

    const [personalStatistics, setPersonalStatistics] = React.useState(null)

    const fetchStatistics = async (challenge) => {
        try {
            var stats = await QueryService.getBySearch("contents", { user_id: props.fakeUserId, challenge_id: challenge.challenge_id, orderedBy: "likes" })
            setPersonalStatistics(stats.data)
        } catch (err) {
            console.error(err)
        }
    }

    return <>
        <Typography style={{ marginTop: "1rem", marginLeft: "1rem" }} variant="h4">Statistics</Typography>
        <Box className="centered" sx={{ height: "100vh", width: "80vh", marginTop: "3rem" }}>
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
                        fetchStatistics(value)
                    }
                }}
            />
            {
                personalStatistics !== null && personalStatistics.length === 0 && <Alert severity="info">You have no content for this challenge!</Alert>
            }
            {
                personalStatistics !== null && personalStatistics.length > 0 && <GridStatistics space={6} statistics={personalStatistics} />
            }
        </Box>
    </>
}

export default Statistics;