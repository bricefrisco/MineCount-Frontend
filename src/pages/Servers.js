import React from 'react'
import {makeStyles} from "@mui/styles";
import Page from "../components/Page";
import TableHeading from "../components/table/TableHeading";
import TableHeader from "../components/table/TableHeader";
import Table from "../components/table/Table";
import TableData from "../components/table/TableData";
import {Box, Typography} from "@mui/material";
import TableRow from "../components/table/TableRow";
import ServerTitle from "../components/ServerTitle";
import Moment from "react-moment";

const useStyles = makeStyles((theme) => ({

}));

const Servers = () => {
    const classes = useStyles();

    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState(false);
    const [error, setError] = React.useState(false);

    React.useEffect(() => {
        setLoading(true);
        setData(null);
        setError(false);

        fetch(process.env.REACT_APP_BACKEND_URI + 'servers')
            .then((res) => res.json())
            .then((res) => {
                if (res.message) {
                    throw Error(res.message)
                } else {
                    setLoading(false);
                    setData(res.sort((a, b) => {
                        return b.players - a.players;
                    }));
                    setError(false);
                }
            })
            .catch((err) => {
                setLoading(false);
                setData(null);
                setError(err.message);
            })
    }, [])

    return (
        <Page title='Minecraft Server List'>
            <Table>
                <TableHeading>
                    <TableHeader counter>#</TableHeader>
                    <TableHeader>Server</TableHeader>
                    <TableHeader>Host</TableHeader>
                    <TableHeader>Players</TableHeader>
                    <TableHeader>Date Added</TableHeader>
                </TableHeading>

            {!error && !loading && !data && (
                <TableRow>
                    <TableData />
                    <TableData>
                        <Typography variant='p'>None found.</Typography>
                    </TableData>
                </TableRow>
            )}

            {error && (
                <TableRow>
                    <TableData />
                    <TableData>
                        <Typography variant='p'>{error}</Typography>
                    </TableData>
                </TableRow>
            )}

            {!error && !loading && data && data.map((req, idx) => (
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
                </TableRow>
            ))}
            </Table>
        </Page>
    )
}

export default Servers;