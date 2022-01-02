import React from 'react';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

const ServerRequests = () => {
    const [status, setStatus] = React.useState('PENDING')
    const [serverRequests, setServerRequests] = React.useState()

    React.useEffect(() => {

    }, [])

    return (
        <>
            <FormControl>
                <InputLabel>Status</InputLabel>
                <Select
                    label='Status'
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <MenuItem value='PENDING'>Pending</MenuItem>
                    <MenuItem value='APPROVED'>Approved</MenuItem>
                    <MenuItem value='DENIED'>Denied</MenuItem>
                </Select>
            </FormControl>
        </>
    )
}

export default ServerRequests;