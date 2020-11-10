import React from 'react';
import PropTypes from 'prop-types';
import {BookCard} from '../components/BookCard';

export const BookRow = ({books, currentUser, setSnackBar}) => {
    return (
        <div style={{display: 'flex'}}>
            {books.map(book => <BookCard key={book.id} {...book} currentUser={currentUser} setSnackBar={setSnackBar}/>)}
        </div>
    )
}

BookRow.propTypes = {
    books: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        categories: PropTypes.arrayOf(PropTypes.string).isRequired,
        authors: PropTypes.arrayOf(PropTypes.string).isRequired,
        imageStream: PropTypes.string.isRequired,
    })).isRequired,
    currentUser: PropTypes.shape({
        name: PropTypes.string,
        username: PropTypes.string,
        email: PropTypes.string
    })
}