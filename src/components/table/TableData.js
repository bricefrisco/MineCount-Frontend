import React from 'react'
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    td: {
        paddingTop: 5,
        paddingBottom: 5,
        color: theme.palette.text.secondary
    }
}))

export const TableData = ({children}) => {
    const classes = useStyles();

    return (<td className={`${classes.td}`}>{children}</td>)
}

export default TableData;