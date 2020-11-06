import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { getAllCategories } from '../util/api';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        marginRight: '20px',
        width: '300px',
        '& > *': {
            marginTop: '10px'
        }
    },
}));

export const Tools = ({
    setSelectedCategoryId,
    setTitle,
    setAuthorName,
    handleSearch,
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
            <List component="nav" aria-label="Book Categories" style={{width: 280}}>
                <ListItem
                    button
                    aria-haspopup="true"
                    aria-controls="category-menu"
                    aria-label="Category"
                    onClick={handleClickListItem}
                >
                    <ListItemText style={{wordBreak: 'break-word'}} primary="Category" secondary={categories.length > 0 ? categories[selectedCategoryIndex].name : ''} />
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
            <TextField
                id="bookNameInput"
                label="Book Name"
                variant="outlined"
                style={{ width: 280 }}
                onInput={(e) => setTitle(e.target.value)}
            />
            <TextField
                id="authorNameInput"
                label="Author Name"
                variant="outlined"
                style={{ width: 280 }}
                onInput={(e) => setAuthorName(e.target.value)}
            />
            <Button variant="contained" color="secondary" onClick={e => handleSearch(e)}>
                Search
            </Button>
        </div>
    );
}

Tools.propTypes = {
    setSelectedCategoryId: PropTypes.func.isRequired,
    setTitle: PropTypes.func.isRequired,
    setAuthorName: PropTypes.func.isRequired,
    handleSearch: PropTypes.func.isRequired,
}