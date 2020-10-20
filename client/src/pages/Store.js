import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {getAllCategories} from '../util/api';
import {Books} from '../components/Books';


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
    },
}));

export const Store = (props) => {
    const classes = useStyles();
    const initState = {
        category: 'All',
        categories: [],
        categoryMenuAnchor: null,
        selectedCategoryIndex: 0,
    };
    const [state, setState] = useState(initState);

    const handleClickListItem = (event) => {
        setState(prevState => ({...prevState, categoryMenuAnchor: event.currentTarget}));
    };

    const handleMenuItemClick = (event, index) => {
        setState(prevState => ({...prevState, selectedCategoryIndex: index}));
        setState(prevState => ({...prevState, categoryMenuAnchor: null}));
    };

    const handleClose = () => {
        setState(prevState => ({...prevState, categoryMenuAnchor: null}));
    };
    
    useEffect(() => {
        getAllCategories().then(res => {
            const catMenu = [state.category, ...res.payload];
            setState(prevState => ({...prevState, categories: catMenu}));
        }).catch(err => {
            console.log(err);
        })
    }, [])

    const {category, categories, categoryMenuAnchor, selectedCategoryIndex} = state;

    return (
        <React.Fragment>
            <div className={classes.root}>
                <List component="nav" aria-label="Book Categories">
                    <ListItem
                        button
                        aria-haspopup="true"
                        aria-controls="category-menu"
                        aria-label="Category"
                        onClick={handleClickListItem}
                    >
                        <ListItemText primary="Category" secondary={categories[selectedCategoryIndex]} />
                    </ListItem>
                </List>
                <Menu
                    id="category-menu"
                    anchorEl={categoryMenuAnchor}
                    keepMounted
                    open={Boolean(categoryMenuAnchor)}
                    onClose={handleClose}
                    anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                    transformOrigin={{vertical: 'bottom', horizontal: 'right'}}
                >
                    {categories.map((c, index) => (
                        <MenuItem
                            key={c}
                            disabled={index === selectedCategoryIndex}
                            selected={index === selectedCategoryIndex}
                            onClick={(event) => handleMenuItemClick(event, index)}
                        >
                            {c}
                        </MenuItem>
                    ))}
                </Menu>
            </div>
            <Books category={category}/>
        </React.Fragment>
    );
}

export default Store;