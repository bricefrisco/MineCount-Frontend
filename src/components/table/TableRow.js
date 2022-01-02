import React from 'react'
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    tr: {
        '&:hover': {
            backgroundColor: 'rgba(255,255,255,.1)'
        },

        '& td:first-child': {
            paddingLeft: 10
        }
    }
}))

const TableRow = ({children}) => {
    const classes = useStyles();

    return <tr className={classes.tr}>{children}</tr>
}

export default TableRow;