import React from 'react'
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    table: {
        width: '100%',
        borderCollapse: 'collapse'
    }
}))

const Table = ({children}) => {
    const classes = useStyles();

    return (<table className={classes.table}>{children}</table>)
}

export default Table;