import React from 'react'
import DoDisturbOffIcon from '@mui/icons-material/DoDisturbOff';
import {Box, Button, IconButton, Modal, TextField, Tooltip, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    deny: {
        '& .MuiButtonBase-root': {
            color: '#dc3545',
        },
        '& .Mui-disabled': {
            color: 'rgba(255, 255, 255, 0.7)'
        }
    },
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: 24,
        padding: 20
    },
    rejectButton: {
        marginTop: '20px!important',
        color: '#dc3545!important'
    }
}))

const DenyButton = ({serverName, statusFilter}) => {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [rejectReason, setRejectReason] = React.useState()

    const [result, setResult] = React.useState();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    const title = () => {
        if (error) return error;
        if (loading) return 'Removing server request...'
        if (result) return result;
        return 'Remove'
    }

    const reject = () => {
        setOpen(false);
        setError(false);
        setLoading(true);
        fetch(`${process.env.REACT_APP_BACKEND_URI}server-requests`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: serverName,
                status: 'denied',
                deniedReason: rejectReason
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

    if (statusFilter === 'denied') return null;

    return (
        <>
            <Tooltip title={title()}>
            <span className={classes.deny}>
                <IconButton disabled={statusFilter === 'denied' || loading || result || error} onClick={() => setOpen(true)}>
                    <DoDisturbOffIcon />
                </IconButton>
            </span>
            </Tooltip>

            <Modal
                open={open}
                onClose={() => setOpen(!open)}
             >
                <Box className={classes.modal}>
                    <Typography variant='h6'>Reject Reason</Typography>

                    <TextField
                        variant='standard'
                        fullWidth
                        label='Reason for rejection'
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                    />

                    <Button
                        title='Reject'
                        disabled={!rejectReason}
                        className={classes.rejectButton}
                        onClick={reject}>
                        Reject
                    </Button>
                </Box>
            </Modal>
        </>
    )
}

export default DenyButton;