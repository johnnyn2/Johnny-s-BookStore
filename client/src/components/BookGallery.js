import React from 'react';
import PropTypes from 'prop-types';
import {BookRow} from '../components/BookRow';
import {BookCard} from '../components/BookCard';

export const BookGallery = ({bookRows, currentUser, setSnackBar}) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'auto', alignItems: 'center', justifyContent: 'space-between' }}>
            {bookRows.map((row, index) => <BookRow key={index} books={row} currentUser={currentUser} setSnackBar={setSnackBar}/>)}
        </div>
    );
}

BookGallery.propTypes = {
    bookRows: PropTypes.arrayOf(PropTypes.array).isRequired,
    currentUser: PropTypes.shape({
        name: PropTypes.string,
        username: PropTypes.string,
        email: PropTypes.string
    })
}