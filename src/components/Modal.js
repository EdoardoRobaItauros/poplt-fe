import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../App.css';
import QueryService from '../services/executeQuery';
import { Autocomplete, Button, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';

function Modal(props) {

    const [selectedChallenge, setSelectedChallenge] = React.useState(null)
    const [selectedPhoto, setSelectedPhoto] = React.useState(null)

    const uploadImage = async () => {
        try {
            const res = await QueryService.post("contents", { id: uuidv4(), user_id: props.fakeUserId, challenge_id: selectedChallenge.challenge_id, image_url: selectedPhoto, likes: 0, isliked: false })
            console.log(res)
            props.setOpenSnackBarOk(true)
        } catch (err) {
            props.setErrorCode(err.response.status + ": " + err.response.statusText)
            props.setOpenSnackBarKo(true)
        } finally {
            setSelectedPhoto(null)
            setSelectedChallenge(null)
        }
    }
    
    return <div style={{ height: "30vh", width: "35vw" }}>
        <DialogTitle id="alert-dialog-title">
            Upload your image!
        </DialogTitle>
        <DialogContent style={{ height: "12vh" }}>
            <Grid container>
                <Grid item xs={12}>
                    <TextField id="standard-basic" label="Insert image url" variant="standard" value={selectedPhoto} onChange={(event) => { setSelectedPhoto(event.target.value) }} />
                </Grid>
                <Grid item xs={12}>
                    <Autocomplete
                        id="combo-box-demo"
                        options={props.challenges}
                        className='centered'
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} label="Choose a challenge" variant="standard" />}
                        onChange={(event, value) => {
                            if (value !== null) {
                                setSelectedChallenge(value)
                            }
                        }}
                    />
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button disabled={!selectedPhoto || !selectedChallenge} onClick={() => {
                props.setOpenModal(false)
                uploadImage()
            }} autoFocus>
                Upload
            </Button>
        </DialogActions>
    </div>
}

export default Modal;