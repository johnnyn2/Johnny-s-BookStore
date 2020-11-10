import React from 'react';
import PropTypes from 'prop-types';
import {BookRow} from '../components/BookRow';

export const BookGallery = ({bookRows, currentUser, setSnackBar, setShowBookInfo, setShowBookId}) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'auto', alignItems: 'center', justifyContent: 'space-between' }}>
            {bookRows.map((row, index) => <BookRow key={index} books={row} currentUser={currentUser} setSnackBar={setSnackBar} setShowBookInfo={setShowBookInfo} setShowBookId={setShowBookId}/>)}
        </div>
    );
}

BookGallery.propTypes = {
    bookRows: PropTypes.arrayOf(PropTypes.array).isRequired,
    currentUser: PropTypes.shape({
        name: PropTypes.string,
        username: PropTypes.string,
        email: PropTypes.string
    }),
    setShowBookInfo: PropTypes.func.isRequired,
    setShowBookId: PropTypes.func.isRequired,
}