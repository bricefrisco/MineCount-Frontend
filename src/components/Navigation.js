import React from 'react'
import {Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import StorageIcon from '@mui/icons-material/Storage';
import NetworkCheckIcon from '@mui/icons-material/NetworkCheck';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { makeStyles } from '@mui/styles';
import {Link, useLocation} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    drawer: { // Side navigation bar
      width: theme.navbar.width,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
          width: theme.navbar.width,
          boxSizing: 'border-box',
          backgroundColor: theme.palette.background.paper
      }
    },
    list: { // Side navigation items
        '& .MuiTypography-root': { // Side navigation typography
          fontWeight: 'bold',
          color: theme.palette.text.secondary,
          fontSize: '0.85rem',
        },
        '& .MuiSvgIcon-root': { // Side navigation icons
            color: theme.palette.text.secondary
        },
        '& .MuiButtonBase-root:hover': { // Side navigation button on hover
            backgroundColor: 'inherit',
            cursor: 'pointer',

            '& .MuiTypography-root': { // Side navigation typography on hover
                color: theme.palette.text.primary,
                transition: theme.transitions.create(['color'], {
                    duration: 500
                }),
            },

            '& .MuiSvgIcon-root': { // Side navigation icons on hover
                color: theme.palette.text.primary,
                transition: theme.transitions.create(['color'], {
                    duration: 500
                }),
            }
        },
        '& .MuiButtonBase-root.Mui-selected': { // Selected side navigation
            '& .MuiTypography-root': {
                color: theme.palette.text.primary,
            },
            '& .MuiSvgIcon-root': {
                color: theme.palette.text.primary,
            }
        },
        '& .MuiButtonBase-root.Mui-selected:hover': { // Selected side navigation on hover
            backgroundColor: 'rgba(144, 202, 249, 0.16)'
        },
    },
    link: { // React router links
        textDecoration: 'none'
    },
    secondaryText: {
        marginTop: '10px!important',
        '&:hover': {
            color: theme.palette.text.primary
        }
    },
    secondaryTextSelected: {
        color: theme.palette.text.primary + '!important'
    }
}))

const Navigation = () => {
    const classes = useStyles();
    const location = useLocation();

    return (
        <Drawer className={classes.drawer} variant='permanent' anchor='left'>
            <Toolbar>MineCount</Toolbar>
            <Divider />
            <List className={classes.list}>
                <Link to='/' className={classes.link}>
                    <ListItem button disableRipple selected={location.pathname === '/'} key='Home'>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary='Home' />
                    </ListItem>
                </Link>

                <Link to='/servers' className={classes.link}>
                    <ListItem button disableRipple selected={location.pathname === '/servers'} key='Servers'>
                        <ListItemIcon>
                            <StorageIcon />
                        </ListItemIcon>
                        <ListItemText primary='Servers'/>
                    </ListItem>
                </Link>

                <Link to='/ping' className={classes.link}>
                    <ListItem button disableRipple selected={location.pathname === '/ping'} key='Ping'>
                        <ListItemIcon>
                            <NetworkCheckIcon />
                        </ListItemIcon>
                        <ListItemText primary='Ping' />
                    </ListItem>
                </Link>

                <Link to='/admin' className={classes.link}>
                    <ListItem button disableRipple selected={location.pathname === '/admin'} key='Admin'>
                        <ListItemIcon>
                            <AdminPanelSettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary='Admin' />
                    </ListItem>
                </Link>

                <Divider />
                <Link to='/add-server' className={classes.link}>
                    <ListItem key='Add Server'>
                        <Typography variant='p' className={`${classes.secondaryText} ${location.pathname === '/add-server' && classes.secondaryTextSelected}`}>Add a server</Typography>
                    </ListItem>
                </Link>
            </List>
        </Drawer>
    )
}

export default Navigation;