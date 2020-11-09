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

export const Books = ({data}) => {
    const classes = useStyles();
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <Card style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
            <div style={{display: 'flex', flex: 1}}></div>
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
}

export default Books;