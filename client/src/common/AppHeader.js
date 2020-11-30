import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import PropTypes from 'prop-types';
import { COLORS, ACCESS_TOKEN } from '../constants/constants';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export const AppHeader = (props) => {
    
    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (e) => {
        setAnchorEl(e.currentTarget);
    } 

    const handleClose = () => {
        setAnchorEl(null);
    }

    return (
        <div className={classes.root}>
            <AppBar position="static" color="primary">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    Johnny's BookStore
                </Typography>
                <Link to="/" style={{textDecoration: "none", color: 'inherit'}}>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <HomeIcon />
                    </IconButton>
                </Link>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                >
                    {props.currentUser.name !== '' ?
                        <div>
                            <Link to="/payment" style={{textDecoration: 'none', color: COLORS.FONTS.BLACK}}>
                                <MenuItem onClick={handleClose}>Payment</MenuItem>
                            </Link>
                            <MenuItem onClick={() => props.onLogout()}>Sign out</MenuItem>
                        </div> :
                        <div>
                            <Link to="/login" style={{textDecoration: 'none', color: COLORS.FONTS.BLACK}}>
                                <MenuItem onClick={handleClose}>Sign In</MenuItem>
                            </Link>
                            <Link to="/signup" style={{textDecoration: 'none', color: COLORS.FONTS.BLACK}}>
                                <MenuItem onClick={handleClose}>Sign Up</MenuItem>
                            </Link>
                        </div>
                    }
                </Menu>
                </Toolbar>
            </AppBar>
        </div>
    )
}

AppHeader.propTypes = {
    currentUser: PropTypes.shape({
        name: PropTypes.string,
        username: PropTypes.string,
        email: PropTypes.string
    })
}

export default withRouter(AppHeader);