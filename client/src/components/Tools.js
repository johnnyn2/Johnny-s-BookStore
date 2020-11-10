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
import { getAllCategories, searchBooksByFilter } from '../util/api';
import {ITEMS_PER_ROW, ROWS_PER_PAGE} from '../constants/constants';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        marginRight: '20px',
        width: '300px',
        '& > *': {
            marginTop: '10px'
        }
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        maxWidth: '100%',
        margin: '0 auto',
        padding: '10px 0',
    },
    flexContainer: {
        display: 'flex',
        flex: 1
    },
    flexButton: {
        display: 'flex',
        flex: 1,
    }
}));

export const Tools = ({setData, currentPage, setShowBookInfo}) => {
    const classes = useStyles();

    const initState = {
        selectedCategoryId: -1,
        title: '',
        authorName: '',
        category: {id: -1, name: 'All'},
        categories: [],
        categoryMenuAnchor: null,
        selectedCategoryIndex: 0
    };

    const [state, setState] = useState(initState);

    useEffect(() => {
        handleSearch(null, state);
        const {category} = state;
        getAllCategories().then(res => {
            const catMenu = [category, ...res.payload];
            setState(prevState => ({...prevState, categories: catMenu}));
        }).catch(err => {
            console.log(err);
        })
    }, [])

    useEffect(() => {
        handleSearch(null, state);
    }, [currentPage])

    const handleSearch = (e, options) => {
        const {selectedCategoryId, title, authorName} = options;
        searchBooksByFilter({ categoryId: selectedCategoryId, title, authorName, page: currentPage -1, size: ITEMS_PER_ROW * ROWS_PER_PAGE })
        .then(data => {
            console.log('data: ', data);
            setData(data);
            setShowBookInfo(false);
        }).catch(err => console.log(err));
    }

    const handleReset = (e) => {
        setState(prevState => {
            handleSearch(e, initState);
            return {
                ...initState,
                categories: prevState.categories,
            };
        });
    }
    
    const handleClickListItem = (event) => {
        setState(prevState => ({...prevState, categoryMenuAnchor: event.currentTarget}));
    };

    const handleMenuItemClick = (event, index) => {
        const {categories} = state;
        setState(prevState => ({
            ...prevState,
            selectedCategoryId: categories[index].id,
            selectedCategoryIndex: index,
            categoryMenuAnchor: null,
        }))
    };

    const handleClose = () => {
        setState(prevState => ({...prevState, categoryMenuAnchor: null}));
    };

    const handleInputText = (e) => {
        e.persist();
        setState(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const {categories, selectedCategoryIndex, categoryMenuAnchor, title, authorName, selectedCategoryId} = state;

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
                name="title"
                onInput={e => handleInputText(e)}
                value={title}
            />
            <TextField
                id="authorNameInput"
                label="Author Name"
                variant="outlined"
                style={{ width: 280 }}
                name="authorName"
                onInput={e => handleInputText(e)}
                value={authorName}
            />
            <div className={classes.buttonContainer}>
                <div className={classes.flexContainer} style={{marginRight: 10}}>
                    <Button className={classes.flexButton} variant="contained" color="secondary" onClick={e => handleSearch(e, state)}>
                        Search
                    </Button>
                </div>
                <div className={classes.flexContainer}>
                    <Button className={classes.flexButton} variant="contained" color="default" onClick={e => {
                        handleReset(e)
                    }}>
                        Reset
                    </Button>
                </div>
            </div>
        </div>
    );
}

Tools.propTypes = {
    setData: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
    setShowBookInfo: PropTypes.func.isRequired
}