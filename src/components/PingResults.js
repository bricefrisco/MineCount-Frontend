import React from 'react'
import {makeStyles} from "@mui/styles";
import {Box, Divider} from "@mui/material";
import {parseText, splitLines} from "../util/textParser";
import SignalWifi3BarIcon from '@mui/icons-material/SignalWifi3Bar';
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import {RectShape, TextBlock} from "react-placeholder/lib/placeholders";


const useStyles = makeStyles((theme) => ({
    box: {
        maxWidth: 500,
        borderRadius: 10,
        backgroundColor: theme.palette.background.paper
    },
    boxHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '5px 10px',
    },
    boxContent: {
        display: 'flex',
        alignItems: 'center',
        padding: 10
    },
    loadingSquare: {
        width: 64,
        height: 64
    },
    hostText: {
        fontWeight: 'bold'
    },
    playerText: {
        color: theme.palette.text.secondary
    },
    connectionPing: {
        display: 'flex',
        alignItems: 'center'
    },
    pingIcon: {
        fontSize: '1rem!important',
        color: 'green',
        marginRight: '5px!important'
    },
    pingText: {
        color: theme.palette.text.secondary
    },
    description: {
        marginLeft: 10
    }
}))

const PingResults = ({loading, error, data, host}) => {
    const classes = useStyles();
    const hostRef = React.useRef(host);

    React.useEffect(() => {
        hostRef.current = host;
    }, [loading])

    if (error) {
        return (
            <Box className={classes.box}>
                <Box className={classes.boxHeader}>
                    <span className={classes.hostText}>{hostRef.current}</span>
                    <span className={classes.playerText}>...</span>
                    <div className={classes.connectionPing}>
                        <SignalWifi3BarIcon className={classes.pingIcon} style={{color: '#dc3545'}}/>
                        <span className={classes.pingText} style={{color: '#dc3545'}}>ERROR</span>
                    </div>
                </Box>

                <Box className={classes.boxContent}>
                    <span style={{color: '#ffc107'}}>{error}</span>
                </Box>
            </Box>
        )
    }

    if (loading || !data) {
        return (
            <ReactPlaceholder ready={!loading} showLoadingAnimation customPlaceholder={
                <Box className={classes.box}>
                    <Box className={classes.boxHeader}>
                        <span className={classes.hostText}>{host}</span>
                        <span className={classes.playerText}>.../...</span>
                        <div className={classes.connectionPing}>
                            <SignalWifi3BarIcon className={classes.pingIcon}/>
                            <span className={classes.pingText}>Loading...</span>
                        </div>
                    </Box>
                    <Box className={classes.boxContent}>
                        <RectShape style={{width: 64, height: 64}} color='gray'/>
                        <TextBlock rows={2} color='white'/>
                    </Box>
                </Box>
            }>
                <div />
            </ReactPlaceholder>
        )
    }

    return (
        <Box className={classes.box}>
            <Box className={classes.boxHeader}>
                <span className={classes.hostText}>{hostRef.current}</span>
                <span className={classes.playerText}>{data.players.online}/{data.players.max}</span>
                <div className={classes.connectionPing}>
                    <SignalWifi3BarIcon className={classes.pingIcon}/>
                    <span className={classes.pingText}>{data.ping}</span>
                </div>
            </Box>
            <Divider/>
            <Box className={classes.boxContent}>
                <img src={data.favicon} alt='Server Favicon'/>
                <div className={classes.description}>
                    <div>
                        {splitLines(parseText(data.description)).first.map((t) => (
                            <span style={{color: t.color, fontWeight: t.bold ? 'bold' : 'normal'}}>
                            {t.text}
                        </span>
                        ))}
                    </div>

                    <div>
                        {splitLines(parseText(data.description)).second.map((t) => (
                            <span style={{color: t.color, fontWeight: t.bold ? 'bold' : 'normal'}}>
                            {t.text}
                        </span>
                        ))}
                    </div>
                </div>
            </Box>
        </Box>
    )
}

export default PingResults;