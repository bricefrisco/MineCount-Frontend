import React from 'react'
import Page from "../components/Page";
import TableHeading from "../components/table/TableHeading";
import TableHeader from "../components/table/TableHeader";
import Table from "../components/table/Table";
import TableData from "../components/table/TableData";
import TableRow from "../components/table/TableRow";
import ServerTitle from "../components/ServerTitle";
import Moment from "react-moment";
import InfiniteScroll from 'react-infinite-scroller';

const Servers = () => {
    const [ltNumPlayers, setLtNumPlayers] = React.useState(false);
    const [hasMore, setHasMore] = React.useState(true);
    const [data, setData] = React.useState([]);
    const [error, setError] = React.useState(false);

    const unique = (servers) => {
        const names = []
        const result = []

        for (let server of servers) {
            if (names.includes(server.name)) {
                continue;
            }

            result.push(server);
            names.push(server.name);
        }

        return result;
    }

    const fetchServers = () => {
        setHasMore(false)

        const url = ltNumPlayers === false ? `${process.env.REACT_APP_BACKEND_URI}servers`
            : `${process.env.REACT_APP_BACKEND_URI}servers?playersLt=${ltNumPlayers}`

        fetch(url)
            .then((res) => res.json())
            .then((res) => {
                if (res.message) {
                    throw Error(res.message)
                } else {
                    setError(false)
                    setData(unique([...data, ...res]))
                    setHasMore(res.length !== 1)
                    setLtNumPlayers(res[res.length - 1].players)
                }
            })
            .catch((err) => {
                setError(err.message)
            })
    }

    return (
        <Page title='Minecraft Server List'>

            <InfiniteScroll
                pageStart={0}
                loadMore={fetchServers}
                hasMore={hasMore}
                loader={<div>Loading...</div>}
            >
                <Table>
                    <TableHeading>
                        <TableHeader counter>#</TableHeader>
                        <TableHeader>Server</TableHeader>
                        <TableHeader>Host</TableHeader>
                        <TableHeader>Players</TableHeader>
                        <TableHeader>Date Added</TableHeader>
                    </TableHeading>

                    {data.map((req, idx) => (
                        <TableRow key={idx}>
                            <TableData>
                                {idx + 1}
                            </TableData>

                            <TableData>
                                <ServerTitle name={req.name}/>
                            </TableData>

                            <TableData>
                                {req.host}
                            </TableData>

                            <TableData>
                                {req.players}
                            </TableData>

                            <TableData>
                                <Moment date={new Date(req.time * 1000)} format='MMM D, YYYY'/>
                            </TableData>
                        </TableRow>
                    ))}
                </Table>
            </InfiniteScroll>
        </Page>
    )
}

export default Servers;