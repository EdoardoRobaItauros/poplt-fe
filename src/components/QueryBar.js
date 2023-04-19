import { constants } from '../config/config';

import * as React from 'react';
import '../App.css';

import Box from '@mui/material/Box';
import { Autocomplete, Grid, IconButton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

function QueryBar(props) {

    return <Box sx={{ marginTop: "2rem" }}>
        <Grid container spacing={1}>
            <Grid item xs={4}>
                <Autocomplete
                    id="combo-box-demo"
                    options={constants.methods}
                    className='centered'
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Method" variant="standard" />}
                    onChange={(event, value) => {
                        if (value !== null) {
                            props.setMethod(value)
                        }
                    }}
                />
            </Grid>
            <Grid className='centered' item xs={4}>
                <Autocomplete
                    disabled={props.method === null || props.method === undefined || props.method.id === null || props.method.id === undefined}
                    id="combo-box-demo"
                    options={constants.tables}
                    className='centered'
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Tablename" variant="standard" />}
                    onChange={(event, value) => {
                        if (value !== null) {
                            props.setTable(value)
                        }
                    }}
                />
            </Grid>
            <Grid className='centered' item xs={3}>
                <TextField
                    disabled={props.table === null || props.table === undefined || props.table === "" || props.method.id === "POST"}
                    id="outlined-controlled"
                    variant="standard"
                    label="Insert id"
                    value={props.queryParam}
                    onChange={(event) => {
                        props.setQueryParam(event.target.value);
                    }}
                />
            </Grid>
            <Grid style={{ justifyContent: "left", textAlign: "left", margintop:"50%" }} item xs={1}>
                <IconButton disabled={props.invalidRequest} onClick={props.sendQuery} color="success">
                    <SendIcon />
                </IconButton>
            </Grid>
        </Grid>
    </Box>
}

export default QueryBar;