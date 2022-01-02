import React from 'react'
import Page from "../components/Page";
import Table from "../components/table/Table";
import TableHeader from "../components/table/TableHeader";
import TableData from "../components/table/TableData";
import TableHeading from "../components/table/TableHeading";
import ServerTitle from "../components/ServerTitle";
import Moment from 'react-moment'
import TableRow from "../components/table/TableRow";
import {Box, FormControl, IconButton, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import ApproveButton from "../components/ApproveButton";
import DenyButton from "../components/DenyButton";

const useStyles = makeStyles((theme) => ({
    status: {
        marginBottom: 20
    },
    actions: {
        display: 'flex',
        alignItems: 'center'
    },
    deny: {
        color: '#dc3545'
    }
}))

const Admin = () => {
    const classes = useStyles();

    const [status, setStatus] = React.useState('approved');

    const [serverRequests, setServerRequests] = React.useState();
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);

    React.useEffect(() => {
        setServerRequests(null)
        setLoading(true)
        setError(false)

        fetch(process.env.REACT_APP_BACKEND_URI + 'server-requests?status=' + status)
            .then((res) => res.json())
            .then((res) => {
                setLoading(false)
                setError(false)
                setServerRequests(res)
            })
            .catch((err) => {
                setLoading(false)
                setError(err.message)
            })
    }, [status])

    return (
        <Page title='Server Management'>
            <Box className={classes.status}>
                <FormControl>
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={status}
                        label='Status'
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <MenuItem value='approved'>Approved</MenuItem>
                        <MenuItem value='pending'>Pending</MenuItem>
                        <MenuItem value='denied'>Denied</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Table>
                <TableHeading>
                    <TableHeader counter>#</TableHeader>
                    <TableHeader>Server</TableHeader>
                    <TableHeader>Host</TableHeader>
                    <TableHeader>Players</TableHeader>
                    <TableHeader>Date Added</TableHeader>
                    {status === 'denied' && <TableHeader>Rejection Reason</TableHeader>}
                    <TableHeader>Actions</TableHeader>
                </TableHeading>

                {!error && !loading && serverRequests && serverRequests.length === 0 && (
                    <TableRow>
                        <TableData />
                        <TableData>
                            <Typography variant='p'>None found.</Typography>
                        </TableData>
                    </TableRow>
                )}

                {!error && !loading && serverRequests && serverRequests.map((req, idx) => (
                    <TableRow key={idx}>
                        <TableData>
                            {idx + 1}
                        </TableData>

                        <TableData>
                            <ServerTitle name={req.name} />
                        </TableData>

                        <TableData>
                            {req.host}
                        </TableData>

                        <TableData>
                            {req.players}
                        </TableData>

                        <TableData>
                            <Moment date={new Date(req.time * 1000)} format='MMM D, YYYY' />
                        </TableData>

                        {status === 'denied' && (
                            <TableData>
                                {req.deniedReason}
                            </TableData>
                        )}

                        <TableData>
                            <Box className={classes.actions}>
                                <ApproveButton serverName={req.name} statusFilter={status} />
                                <DenyButton serverName={req.name} statusFilter={status} />
                            </Box>
                        </TableData>
                    </TableRow>
                ))}
            </Table>
        </Page>
    )
}

export default Admin;