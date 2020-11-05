import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import Card from '@material-ui/core/Card';
import {getAllBooks, getBooksByCategory} from '../util/api';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export const Books = ({categoryId}) => {
    const classes = useStyles();
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (categoryId === -1) {
            getAllBooks({page: 0, size: 10})
            .then(res => {
                setCurrentPage(1);
                setBooks(res.content);
            }).catch(err => {
                console.log(err);
            })
        } else {
            getBooksByCategory({categoryId, page: 0, size: 10})
            .then(res => {
                setCurrentPage(1);
                setBooks(res.content);
            }).catch(err => {
                console.log(err);
            })
        }
    }, [categoryId])

    return (
        <Card style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
            <div style={{display: 'flex', flex: 1}}></div>
            <Pagination count={10} color="primary" />
        </Card>
        
    );
}

Books.propTypes = {
    categoryId: PropTypes.number.isRequired,
}

export default Books;