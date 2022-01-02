import React from 'react'
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    th: {
        textAlign: 'left',
        color: theme.palette.text.secondary,
        fontWeight: 'normal',
        textTransform: 'uppercase',
        fontSize: '0.85rem',
        paddingBottom: '10px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
    },

    counter: {
        width: '25px'
    }
}))

const TableHeader = ({children, counter}) => {
    const classes = useStyles();

    return (
        <th className={`${classes.th} ${counter && classes.counter}`}>{children}</th>
    )
}

export default TableHeader;