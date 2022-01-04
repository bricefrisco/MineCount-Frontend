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
    const [show, setShow] = React.useState(false);

    const onHostChange = (e) => {
        setShow(false)
        setHost(e.target.value)
    }

    const onPortChange = (e) => {
        setShow(false)
        setPort(e.target.value)
    }

    const onDefaultPortChange = (e) => {
        setShow(false)
        setUseDefaultPort(e.target.checked)
    }

    const onPingClicked = (e) => {
        setShow(true)
    }

    return (
        <Page title='Minecraft Server Pinger'>
            <Box className={classes.textBox}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={defaultPort}
                            onChange={onDefaultPortChange}
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
                    onClick={onPingClicked}
                >
                    Ping
                </Button>
            </Box>

            {show && (
                <PingResults host={host} port={port} />
            )}
        </Page>
    )
}

export default Ping;