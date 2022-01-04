import React from 'react'
import Page from "../components/Page";
import {makeStyles} from "@mui/styles";
import {Alert, Box, Button, Checkbox, FormControlLabel, TextField, Typography} from "@mui/material";
import PingResults from "../components/PingResults";
import LinearProgress from '@mui/material/LinearProgress';

const useStyles = makeStyles((theme) => ({
    textBox: {
        display: 'block',
        marginBottom: '10px!important',
        marginRight: '10px!important',
        maxWidth: '500px',
    },
    host: {
        marginRight: '10px!important'
    },
    pingButton: {
        maxWidth: '500px',
        marginBottom: '30px!important'
    },
    prompt: {
        fontWeight: 'normal!important',
        marginBottom: '15px!important'
    },
    alert: {
        maxWidth: '500px'
    },
    submitLoading: {
        maxWidth: '500px'
    }
}))

const AddAServer = () => {
    const classes = useStyles();

    const [host, setHost] = React.useState();
    const [defaultPort, setUseDefaultPort] = React.useState(true);
    const [port, setPort] = React.useState();

    const [numPlayers, setNumPlayers] = React.useState(false);
    const [showPing, setShowPing] = React.useState(false);
    const [showSubmit, setShowSubmit] = React.useState(false)

    const [submitLoading, setSubmitLoading] = React.useState(false);
    const [submitData, setSubmitData] = React.useState();
    const [submitError, setSubmitError] = React.useState(false);

    const onUseDefaultPortChange = (e) => {
        setNumPlayers(false);
        setShowSubmit(false)
        setShowPing(false)
        setUseDefaultPort(e.target.value)
    }

    const onPortChange = (e) => {
        setNumPlayers(false);
        setShowSubmit(false)
        setShowPing(false)
        setPort(e.target.value)
    }

    const onHostChange = (e) => {
        setNumPlayers(false);
        setShowSubmit(false)
        setShowPing(false)
        setHost(e.target.value)
    }

    const onPingClick = (e) => {
        setShowPing(true)
    }

    const onPingSuccess = (e) => {
        setShowSubmit(true)
        setNumPlayers(e.players.online)
    }

    const onPingFail = (e) => {
        setShowSubmit(false)
    }

    const submit = () => {
        setSubmitLoading(true);
        setSubmitData(null);
        setSubmitError(false);

        fetch(`${process.env.REACT_APP_BACKEND_URI}server-requests`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                host
            })
        })
            .then((res) => res.json())
            .then((res) => {
                if (!res.message.includes('Successfully')) {
                    throw Error(res.message)
                } else {
                    setSubmitLoading(false)
                    setSubmitData(res.message)
                    setSubmitError(false);
                }
            })
            .catch((err) => {
                setSubmitLoading(false)
                setSubmitData(null)
                setSubmitError(err.message)
            })
    }

    return (
        <Page title='Add A Server'>
            <Typography variant='h5' className={classes.prompt}>Please enter the server address:</Typography>
            <Box className={classes.textBox}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={defaultPort}
                            onChange={onUseDefaultPortChange}
                        />
                    }
                    label='Default port (25565)'
                />
            </Box>

            <Box className={classes.textBox}>
                <TextField
                    fullWidth
                    className={classes.host}
                    label="Host"
                    variant="filled"
                    placeholder='mc.example.com'
                    value={host}
                    onChange={onHostChange}
                />

                {!defaultPort && (
                    <TextField
                        label="Port"
                        variant="filled"
                        placeholder='25565'
                        type='number'
                        value={port}
                        onChange={onPortChange}
                    />
                )}
            </Box>

            <Box className={classes.pingButton}>
                <Button
                    variant={'contained'}
                    fullWidth
                    title='Ping'
                    disabled={!host || (!defaultPort && !port)}
                    onClick={onPingClick}
                >
                    Ping
                </Button>
            </Box>

            {showPing && (
                <PingResults host={host} port={port} onSuccess={onPingSuccess} onError={onPingFail} />
            )}

            {numPlayers && numPlayers < 10 && (
                <Alert severity="warning" className={classes.alert}>Server must have at least 10 players online - please
                    try again once this requirement is met!</Alert>
            )}

            {numPlayers && numPlayers >= 10 && showSubmit && (
                <Box className={classes.pingButton}>
                    <Button
                        variant={'contained'}
                        fullWidth
                        title='Submit'
                        onClick={submit}
                        disabled={submitLoading || submitData}
                    >
                        Submit
                    </Button>
                </Box>
            )}

            {submitLoading && (
                <Box className={classes.submitLoading}>
                    <LinearProgress/>
                </Box>
            )}

            {submitError && (
                <Alert severity="error" className={classes.alert}>{submitError}</Alert>
            )}

            {submitData && (
                <Alert severity="success" className={classes.alert}>
                    Successfully submitted server.
                    We will review the server, and add it as long as it is appropriate.
                    Please allow up to 48 hours for approvals to complete.
                </Alert>
            )}


        </Page>
    )
}

export default AddAServer;