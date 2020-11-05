import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { getAllCategories } from '../util/api';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
    },
}));

export const Tools = ({
    setSelectedCategoryId
}) => {
    const classes = useStyles();
    const [category, setCategory] = useState({id: -1, name: 'All'});
    const [categories, setCategories] = useState([]);
    const [categoryMenuAnchor, setCategoryMenuAnchor] = useState(null);
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);

    useEffect(() => {
        getAllCategories().then(res => {
            const catMenu = [category, ...res.payload];
            setCategories(catMenu);
        }).catch(err => {
            console.log(err);
        })
    }, [])

    const handleClickListItem = (event) => {
        setCategoryMenuAnchor(event.currentTarget);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedCategoryId(categories[index].id);
        setSelectedCategoryIndex(index);
        setCategoryMenuAnchor(null);
    };

    const handleClose = () => {
        setCategoryMenuAnchor(null);
    };


    return (
        <div className={classes.root}>
            <List component="nav" aria-label="Book Categories">
                <ListItem
                    button
                    aria-haspopup="true"
                    aria-controls="category-menu"
                    aria-label="Category"
                    onClick={handleClickListItem}
                    style={{ width: 300 }}
                >
                    <ListItemText primary="Category" secondary={categories.length > 0 ? categories[selectedCategoryIndex].name : ''} />
                </ListItem>
            </List>
            <Menu
                id="category-menu"
                anchorEl={categoryMenuAnchor}
                keepMounted
                open={Boolean(categoryMenuAnchor)}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                style={{ width: 600, overflow: 'auto' }}
            >
                {categories.map((c, index) => (
                    <MenuItem
                        key={c.id}
                        disabled={index === selectedCategoryIndex}
                        selected={index === selectedCategoryIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                    >
                        {c.name}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}

Tools.propTypes = {
    setSelectedCategoryId: PropTypes.func.isRequired,
}