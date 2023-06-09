import * as React from 'react';
import '../App.css';
import { Alert, Fab, Grid, Snackbar, Tooltip } from '@mui/material';
import ProfileCard from '../components/ProfileCard';
import QueryService from '../services/executeQuery';
import AddIcon from '@mui/icons-material/Add';
import PublicIcon from '@mui/icons-material/Public';
import { green, blue } from '@mui/material/colors';
import Dialog from '@mui/material/Dialog';
import Modal from '../components/Modal';
import Statistics from '../components/Statistics';
import ModalGlobalStats from '../components/ModalGlobalStats';


const fakeUserId = "12"

function Challenges() {

    const [user, setUser] = React.useState({})
    const [challenges, setChallenges] = React.useState([])
    const [openModal, setOpenModal] = React.useState(false)
    const [openModalGlobalStats, setOpenModalGlobalStats] = React.useState(false)
    const [selectedChallenge, setSelectedChallenge] = React.useState(false)
    const [openSnackBarOk, setOpenSnackBarOk] = React.useState(false);
    const [openSnackBarKo, setOpenSnackBarKo] = React.useState(false);
    const [errorCode, setErrorCode] = React.useState()
    const [personalStatistics, setPersonalStatistics] = React.useState(null)

    React.useEffect(() => {
        fetchUser(fakeUserId)
        fetchChallenges(fakeUserId)
    }, [])

    const fetchUser = async (fakeUserId) => {
        try {
            const result = await QueryService.getById("users", fakeUserId)
            setUser(result.data.data[0])
        } catch (err) {
            setErrorCode(err.toString())
            setOpenSnackBarKo(true)
        }
    }

    const fetchChallenges = async () => {
        try {
            const result = await QueryService.get("challenges")
            setChallenges(result.data.data)
        } catch (err) {
            setErrorCode(err.toString())
            setOpenSnackBarKo(true)
        }
    }

    const handleCloseSnackBarOk = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBarOk(false);
    };

    const handleCloseSnackBarKo = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setErrorCode()
        setOpenSnackBarKo(false);
    };

    const fetchStatistics = async (challenge) => {
        try {
            var stats = await QueryService.getBySearch("contents", { user_id: fakeUserId, challenge_id: challenge.challenge_id, orderedBy: "likes" })
            setPersonalStatistics(stats.data.data)
        } catch (err) {
            setErrorCode("404: Not Found")
            setOpenSnackBarKo(true)
            console.error(err)
        }
    }

    return <Grid style={{ height: "100vh" }} container>
        <Grid style={{ height: "100vh" }} item xs={3} sx={{ borderRight: 1 }}>
            <ProfileCard user={user} />
        </Grid>
        <Grid style={{ height: "100vh" }} item xs={9}>
            <Statistics personalStatistics={personalStatistics} setPersonalStatistics={setPersonalStatistics} fetchStatistics={fetchStatistics} selectedChallenge={selectedChallenge} setSelectedChallenge={setSelectedChallenge} challenges={challenges} />
            <Dialog
                open={openModal}
                onClose={() => { setOpenModal(false) }}
            >
                <Modal fetchStatistics={fetchStatistics} setErrorCode={setErrorCode} space={6} challenges={challenges} fakeUserId={fakeUserId} setOpenSnackBarOk={setOpenSnackBarOk} setOpenSnackBarKo={setOpenSnackBarKo} setOpenModal={setOpenModal} />
            </Dialog>
            <Tooltip title="Add new content">
                <Fab onClick={() => { setOpenModal(true) }} sx={{ position: "fixed", bottom: 20, right: 20, margin: 0, top: "auto", left: "auto", bgcolor: green[500], '&:hover': { bgcolor: green[600] } }} color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
            </Tooltip>
            <Dialog className='centered'
                open={openModalGlobalStats}
                onClose={() => { setOpenModalGlobalStats(false) }}
            >
                <ModalGlobalStats space={12} selectedChallenge={selectedChallenge} setSelectedChallenge={setSelectedChallenge} setopenModalGlobalStats={setOpenModalGlobalStats} />
            </Dialog>
            <Tooltip title="See global stats">
                <Fab disabled={!selectedChallenge} onClick={() => { setOpenModalGlobalStats(true) }} sx={{ position: "fixed", bottom: 20, right: 80, margin: 0, top: "auto", left: "auto", bgcolor: blue[500], '&:hover': { bgcolor: blue[600] } }} color="primary" aria-label="add">
                    <PublicIcon />
                </Fab>
            </Tooltip>
        </Grid>
        <Snackbar open={openSnackBarOk} autoHideDuration={5000} onClose={handleCloseSnackBarOk}>
            <Alert onClose={handleCloseSnackBarOk} severity="success" sx={{ width: '100%' }}>
                Operation successful!
            </Alert>
        </Snackbar>
        <Snackbar open={openSnackBarKo} autoHideDuration={5000} onClose={handleCloseSnackBarKo}>
            <Alert onClose={handleCloseSnackBarKo} severity="error" sx={{ width: '100%' }}>
                Something went wrong! {errorCode}
            </Alert>
        </Snackbar>
    </Grid>
}

export default Challenges;