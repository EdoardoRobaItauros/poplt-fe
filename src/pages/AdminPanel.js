import '../App.css';
import * as React from 'react';
import { constants } from '../config/config';

import QueryService from '../services/executeQuery';
import QueryBar from '../components/QueryBar';
import { Alert, Box, Button, Typography } from '@mui/material';
import CustomTable from '../components/CustomTable';
import CodeEditor from '../components/CodeEditor';
import Snackbar from '@mui/material/Snackbar';

function AdminPanel() {

    const [queryParam, setQueryParam] = React.useState("")
    const [table, setTable] = React.useState("")
    const [errorCode, setErrorCode] = React.useState()
    const [method, setMethod] = React.useState({})
    const [queryResult, setQueryResult] = React.useState()
    const [code, setCode] = React.useState()
    const [openSnackBarOk, setOpenSnackBarOk] = React.useState(false);
    const [openSnackBarKo, setOpenSnackBarKo] = React.useState(false);
    const [invalidRequest, setInvalidRequest] = React.useState(false);

    React.useEffect(() => {
        setInvalidRequest(false)
        if (method.id === "PUT") {
            setTimeout(async () => {
                try {
                    const result = await QueryService.getById(table.id, queryParam)
                    if (result.data.length === 0) {
                        setInvalidRequest(true)
                        setErrorCode("404: Not Found")
                        setOpenSnackBarKo(true)
                        setCode()
                    } else {
                        setCode(result.data[0])
                    }
                } catch (err) {
                    setErrorCode(err.response.status + ": " + err.response.statusText)
                    setOpenSnackBarKo(true)
                    setCode()
                }
            }, 1000);
        }
    }, [queryParam])

    React.useEffect(() => {
        if (method.id === "POST" && table.id !== "") {
            setCode(constants.schemas[table.id])
        }
    }, [method, table])

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

    const sendQuery = async () => {
        setQueryResult()
        var result = []
        switch (method.id) {
            case "GET":
                try {
                    if (queryParam !== null && queryParam !== undefined && queryParam !== "") {
                        result = await QueryService.getById(table.id, queryParam)
                        if (result.data.length === 0) {
                            setErrorCode("404: Not Found")
                            setOpenSnackBarKo(true)
                        } else {
                            setQueryResult(result)
                        }
                    } else {
                        result = await QueryService.get(table.id)
                        setQueryResult(result)
                    }
                } catch (err) {
                    setErrorCode(err.response.status + ": " + err.response.statusText)
                    setOpenSnackBarKo(true)
                }
                break
            case "PUT":
                try {
                    result = await QueryService.put(table.id, queryParam, code)
                    setOpenSnackBarOk(true)
                    setQueryResult(result)
                } catch (err) {
                    setErrorCode(err.response.status + ": " + err.response.statusText)
                    setOpenSnackBarKo(true)
                }
                break
            case "POST":
                try {
                    result = await QueryService.post(table.id, code)
                    setOpenSnackBarOk(true)
                    setQueryResult(result)
                } catch (err) {
                    setErrorCode(err.response.status + ": " + err.response.statusText)
                    setOpenSnackBarKo(true)
                }
                break
            case "DELETE":
                try {
                    result = await QueryService.delete(table.id, queryParam)
                    setOpenSnackBarOk(true)
                    setQueryResult(result)
                } catch (err) {
                    setErrorCode(err.response.status + ": " + err.response.statusText)
                    setOpenSnackBarKo(true)
                }
                break
            default:
                console.log("Method not handled!")
                break
        }
    }

    return <div className='centered'>
        <Typography variant="h3" gutterBottom style={{ marginTop: "2rem" }}>
            Admin Panel
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
            Manage your data in this page
        </Typography>
        <QueryBar invalidRequest={invalidRequest} setQueryParam={setQueryParam} setTable={setTable} table={table} queryParam={queryParam} sendQuery={sendQuery} method={method} setMethod={setMethod} />
        {
            queryResult && method.id === "GET" && <Box className="centered" style={{ width: "90%", marginTop: "2rem" }}><CustomTable data={queryResult.data} /></Box>
        }
        {
            code && method.id === "PUT" && <Box className="centered" style={{ width: "20%", marginTop: "2rem" }}><CodeEditor className="centered" code={code} setCode={setCode} /><Button onClick={sendQuery}>Update</Button></Box>
        }
        {
            table !== "" && method.id === "POST" && <Box className="centered" style={{ width: "20%", marginTop: "2rem" }}><CodeEditor className="centered" code={code} setCode={setCode} /><Button onClick={sendQuery}>Create</Button></Box>
        }
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
    </div>
}

export default AdminPanel;