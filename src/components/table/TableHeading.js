import React from 'react'
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    thead: {
        '& th:first-child': {
            paddingLeft: 10
        }
    }
}))

const TableHeading = ({children}) => {
    const classes = useStyles();

    return <thead className={classes.thead}>{children}</thead>
}

export default TableHeading;