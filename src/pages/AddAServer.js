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

    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState();
    const [error, setError] = React.useState(false);

    const [serverName, setServerName] = React.useState();

    const [submitLoading, setSubmitLoading] = React.useState(false);
    const [submitData, setSubmitData] = React.useState();
    const [submitError, setSubmitError] = React.useState(false);

    const hostRef = React.useRef(host);

    React.useEffect(() => {
        hostRef.current = host;
    }, [loading])

    const ping = () => {
        setLoading(true);
        setData(null);
        setError(false);

        fetch(`${process.env.REACT_APP_BACKEND_URI}ping?host=${host.trim()}&port=${!port ? '25565' : port.trim()}`)
            .then((res) => res.json())
            .then((res) => {
                if (res.message) {
                    throw new Error(res.message)
                } else {
                    setLoading(false)
                    setData(res)
                    setError(false)
                }
            })
            .catch((err) => {
                setLoading(false)
                setData(null)
                setError(err.message)
            })
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
                host: hostRef.current,
                name: serverName
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
                            onChange={(e) => setUseDefaultPort(e.target.checked)}
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
                    onChange={(e) => setHost(e.target.value)}
                />

                {!defaultPort && (
                    <TextField
                        label="Port"
                        variant="filled"
                        placeholder='25565'
                        type='number'
                        value={port}
                        onChange={(e) => setPort(e.target.value)}
                    />
                )}
            </Box>

            <Box className={classes.pingButton}>
                <Button
                    variant={'contained'}
                    fullWidth
                    title='Ping'
                    disabled={loading || !host || (!defaultPort && !port)}
                    onClick={ping}
                >
                    Ping
                </Button>
            </Box>

            <PingResults loading={loading} error={error} data={data} host={host}/>

            {data && data.players.online < 10 && (
                <Alert severity="warning" className={classes.alert}>Server must have at least 10 players online - please try again once this requirement is met!</Alert>
            )}

            {data && data.players.online > 10 && (
                <>
                    <Typography variant='h5' className={classes.prompt}>
                        What is the name of this server?
                    </Typography>
                    <Box className={classes.textBox}>
                        <TextField
                            fullWidth
                            label="Name"
                            variant="filled"
                            value={serverName}
                            onChange={(e) => setServerName(e.target.value)}
                        />
                    </Box>
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
                </>
            )}

            {submitLoading && (
                <Box className={classes.submitLoading}>
                    <LinearProgress />
                </Box>
            )}

            {submitError && (
                <Alert severity="error" className={classes.alert}>{submitError}</Alert>
            )}

            {submitData && (
                <Alert severity="success" className={classes.alert}>
                    Successfully submitted server. After review, this server will be added!
                    Please allow up to 48 hours for approvals to complete.
                </Alert>
            )}


        </Page>
    )
}

export default AddAServer;