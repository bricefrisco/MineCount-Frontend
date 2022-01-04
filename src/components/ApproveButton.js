import React from 'react'
import {AddTask} from "@mui/icons-material";
import {Box, Button, IconButton, Modal, TextField, Tooltip, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import PingResults from "./PingResults";

const useStyles = makeStyles((theme) => ({
    approve: {
        '& .MuiButtonBase-root': {
            color: '#1db954',
        },
        '& .Mui-disabled': {
            color: 'rgba(255, 255, 255, 0.7)!important'
        }
    },
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: 24,
        padding: 20
    },
    input: {
        marginBottom: '10px!important'
    }

}))

const ApproveButton = ({host, port, status}) => {
    const classes = useStyles();

    const [result, setResult] = React.useState();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState('');

    const title = () => {
        if (error) return error;
        if (loading) return 'Adding server...'
        if (result) return result;
        return 'Add'
    }

    const onClick = () => {
        setOpen(false);
        setError(false);
        setLoading(true);
        fetch(`${process.env.REACT_APP_BACKEND_URI}server-requests`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                host,
                name,
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

    if (status === 'approved') return null;

    return (
        <>
            <Tooltip title={title()}>
            <span className={classes.approve}>
                <IconButton disabled={loading || result || error} onClick={() => setOpen(true)}>
                    <AddTask />
                </IconButton>
            </span>
            </Tooltip>

            <Modal
                open={open}
                onClose={() => setOpen(!open)}
            >
                <Box className={classes.modal}>
                    <Typography variant='h6'>Server Approval</Typography>

                    <PingResults host={host} port={port} />

                    <TextField
                        variant='standard'
                        fullWidth
                        label='Server name'
                        value={name}
                        className={classes.input}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <Button
                        title='Approve'
                        variant={'contained'}
                        disabled={!name}
                        onClick={onClick}>
                        Approve
                    </Button>
                </Box>
            </Modal>
        </>
    )
}

export default ApproveButton;