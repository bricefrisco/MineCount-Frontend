import React from 'react'
import {makeStyles} from "@mui/styles";
import TableData from "./table/TableData";
import {Box, Typography} from "@mui/material";

const useStyles = makeStyles((theme) => ({
    box: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: theme.palette.text.primary,
        fontWeight: 400
    }
}))

const ServerTitle = ({name}) => {
    const classes = useStyles();

    return (
        <TableData>
            <Box className={classes.box}>
                <img src={process.env.REACT_APP_BUCKET_URI + name.toLowerCase().replace(/ /g, '-') + '.png'} alt={name} />
                <Typography variant='p' className={classes.title}>{name}</Typography>
            </Box>
        </TableData>
    )
}

export default ServerTitle;