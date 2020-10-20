import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import {getBooksByCategory} from '../util/api';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export const Books = ({category}) => {
    const classes = useStyles();
    const initState = {};
    const [state, setState] = useState(initState);
    useEffect(() => {
        getBooksByCategory({category, page: 0, size: 10})
        .then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }, [])

    return (
        <div style={{display: 'flex', width: '100%'}}>
            
            <Pagination count={10} color="primary" />
        </div>
        
    );
}

Books.propTypes = {
    category: PropTypes.string.isRequired,
}

export default Books;