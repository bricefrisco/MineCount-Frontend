import React from 'react'
import {AddTask} from "@mui/icons-material";
import {IconButton, Tooltip} from "@mui/material";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    approve: {
        '& .MuiButtonBase-root': {
            color: '#1db954',
        },
        '& .Mui-disabled': {
            color: 'rgba(255, 255, 255, 0.7)!important'
        }
    },
}))

const ApproveButton = ({serverName, statusFilter}) => {
    const classes = useStyles();

    const [result, setResult] = React.useState();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    const title = () => {
        if (error) return error;
        if (loading) return 'Adding server...'
        if (result) return result;
        return 'Add'
    }

    const onClick = () => {
        setError(false);
        setLoading(true);
        fetch(`${process.env.REACT_APP_BACKEND_URI}server-requests`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: serverName,
                status: 'approved'
            })
        })
            .then((res) => res.json())
            .then((res) => {
                setError(false);
                setLoading(false);
                setResult(res.message)
            })
            .catch((err) => {
                setError(err.message)
                setLoading(false)
                setResult(null)
            })
    }

    if (statusFilter === 'approved') return null;

    return (
        <Tooltip title={title()}>
            <span className={classes.approve}>
                <IconButton disabled={loading || result || error} onClick={onClick}>
                    <AddTask />
                </IconButton>
            </span>
        </Tooltip>
    )
}

export default ApproveButton;