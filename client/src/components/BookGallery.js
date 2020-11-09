import React from 'react';
import PropTypes from 'prop-types';
import {BookRow} from '../components/BookRow';
import {BookCard} from '../components/BookCard';

export const BookGallery = ({bookRows}) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'auto', alignItems: 'center', justifyContent: 'space-between' }}>
            {bookRows.map((row, index) => <BookRow key={index} books={row} />)}
        </div>
    );
}

BookGallery.propTypes = {
    bookRows: PropTypes.arrayOf(PropTypes.array).isRequired,
}