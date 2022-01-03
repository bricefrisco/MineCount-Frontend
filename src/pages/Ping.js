import React from 'react'
import {makeStyles} from "@mui/styles";
import Page from "../components/Page";
import {Box, Button, Checkbox, FormControlLabel, TextField} from "@mui/material";
import PingResults from "../components/PingResults";

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
    }
}))

const Ping = () => {
    const classes = useStyles();

    const [host, setHost] = React.useState();
    const [defaultPort, setUseDefaultPort] = React.useState(true);
    const [port, setPort] = React.useState();

    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState();
    const [error, setError] = React.useState(false);

    const ping = () => {
        setLoading(true);
        setData(null);
        setError(false);

        fetch(`${process.env.REACT_APP_BACKEND_URI}ping?host=${host}&port=${!port ? '25565' : port}`)
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

    return (
        <Page title='Minecraft Server Pinger'>
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

            <PingResults loading={loading} error={error} data={data} host={host} />
        </Page>
    )
}

export default Ping;