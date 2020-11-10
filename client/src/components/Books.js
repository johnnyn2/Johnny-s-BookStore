import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import Card from '@material-ui/core/Card';
import {getAllBooks, searchBooksByFilter} from '../util/api';
import {BookRow} from '../components/BookRow';
import {BookCard} from '../components/BookCard';
import {BookGallery} from '../components/BookGallery';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
        },
    },
}));

const ITEMS_PER_ROW = 3;

export const Books = ({data, currentUser, setSnackBar}) => {
    const classes = useStyles();
    const [currentPage, setCurrentPage] = useState(1);

    let bookRows = [];
    for(let i =0;i<Math.ceil(data.content.length / 3); i++) {
        let start = i * ITEMS_PER_ROW;
        let end = start + ITEMS_PER_ROW ;
        bookRows = [...bookRows, data.content.slice(start, end)];
    }

    return (
        <Card style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
            {data.content.length > 0 ?
                <BookGallery bookRows={bookRows} currentUser={currentUser} setSnackBar={setSnackBar}/>
            :
                <div style={{display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    No results found
                </div>
            }
            <div style={{display: 'flex', height: '50px', margin: '20px', justifyContent: 'center', alignItems: 'center'}}>
                <Pagination
                    count={data.content.length > 0 ? Math.ceil(data.content.length / 10.0) : 0}
                    color="primary"
                    page={currentPage}
                    onChange={(event, value) => { setCurrentPage(value); }}
                />
            </div>
        </Card>
        
    );
}

Books.propTypes = {
    data: PropTypes.shape({
        content: PropTypes.arrayOf(PropTypes.object).isRequired,
        last: PropTypes.bool.isRequired,
        page: PropTypes.number.isRequired,
        size: PropTypes.number.isRequired,
        totalElements: PropTypes.number.isRequired,
        totalPages: PropTypes.number.isRequired,
    }).isRequired,
    currentUser: PropTypes.shape({
        name: PropTypes.string,
        username: PropTypes.string,
        email: PropTypes.string
    })
}

export default Books;