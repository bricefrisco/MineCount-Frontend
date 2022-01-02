import React from 'react'
import {Box, Divider, Typography} from "@mui/material";
import {makeStyles} from '@mui/styles'

const useStyles = makeStyles((theme) => ({
    titleBox: {
        paddingLeft: theme.navbar.width,
        backgroundColor: theme.palette.background.paper,
        paddingTop: 40
    },
    title: {
        marginLeft: '25px!important'
    },
    page: {
        padding: 25,
        paddingLeft: theme.navbar.width + 25,
    },
}))

const Page = ({title, children}) => {
    const classes = useStyles();

    return (
        <>
            <Box className={classes.titleBox}>
                <Typography variant='h1' className={classes.title}>{title}</Typography>
            </Box>
            <Divider />
            <Box className={classes.page}>
                {children}
            </Box>
        </>
    )
}

export default Page;