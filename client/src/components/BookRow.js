import React from 'react';
import PropTypes from 'prop-types';
import {BookCard} from '../components/BookCard';

export const BookRow = ({books, setSnackBar, setShowBookInfo, setShowBookId, setEndingScrollPosition, containerRef, addToCart}) => {
    return (
        <div style={{display: 'flex'}}>
            {books.map(book =>
                <BookCard key={book.id}
                    {...book}
                    setSnackBar={setSnackBar}
                    setShowBookInfo={setShowBookInfo}
                    setShowBookId={setShowBookId}
                    setEndingScrollPosition={setEndingScrollPosition}
                    containerRef={containerRef}
                    addToCart={addToCart}
                />)}
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
        price: PropTypes.number.isRequired
    })).isRequired,
    setShowBookInfo: PropTypes.func.isRequired,
    setShowBookId: PropTypes.func.isRequired,
    setEndingScrollPosition: PropTypes.func.isRequired,
    containerRef: PropTypes.shape({current: PropTypes.instanceOf(Element)}),
    addToCart: PropTypes.func.isRequired
}