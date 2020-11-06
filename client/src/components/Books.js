import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import Card from '@material-ui/core/Card';
import {getAllBooks, searchBooksByFilter} from '../util/api';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export const Books = ({categoryId, title, authorName}) => {
    const classes = useStyles();
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const handleSearch = () => {
        searchBooksByFilter({categoryId, title, authorName, page: 0, size: 10})
        .then(res => {
            console.log(res);
            setCurrentPage(1);
            setBooks(res.content);
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
            getAllBooks({page: 0, size: 10})
            .then(res => {
                setCurrentPage(1);
                setBooks(res.content);
            }).catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <Card style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
            <div style={{display: 'flex', flex: 1}}></div>
            <div style={{display: 'flex', height: '50px', margin: '20px', justifyContent: 'center', alignItems: 'center'}}>
                <Pagination count={10} color="primary" />
            </div>
        </Card>
        
    );
}

Books.propTypes = {
    categoryId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    authorName: PropTypes.string.isRequired
}

export default Books;