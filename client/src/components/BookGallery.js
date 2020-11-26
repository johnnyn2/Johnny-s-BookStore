import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {BookRow} from '../components/BookRow';

export const BookGallery = ({scrollTop, setScrollTop, bookRows, setSnackBar, setShowBookInfo, setShowBookId, addToCart, shoppingCart, addToBookMarks, bookMarks}) => {
    const styles = {
        display: 'flex',
        flexDirection: 'column',
        flex: 1, overflow: 'auto',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
    const containerRef = useRef(null);
    useEffect(() => {
        if (typeof containerRef.current !== 'undefined') {
            containerRef.current.scrollTop = scrollTop;
        }
    }, [])
    return (
        <div ref={containerRef} style={styles}>
            {bookRows.map((row, index) => 
                <BookRow
                    key={index}
                    books={row}
                    setSnackBar={setSnackBar}
                    setShowBookInfo={setShowBookInfo}
                    setShowBookId={setShowBookId}
                    setEndingScrollPosition={setScrollTop}
                    containerRef={containerRef}
                    addToCart={addToCart}
                    shoppingCart={shoppingCart}
                    addToBookMarks={addToBookMarks}
                    bookMarks={bookMarks}
                />)}
        </div>
    );
}

BookGallery.propTypes = {
    scrollTop: PropTypes.number.isRequired,
    setScrollTop: PropTypes.func.isRequired,
    bookRows: PropTypes.arrayOf(PropTypes.array).isRequired,
    setShowBookInfo: PropTypes.func.isRequired,
    setShowBookId: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired,
    shoppingCart: PropTypes.array.isRequired,
    addToBookMarks: PropTypes.func.isRequired,
    bookMarks: PropTypes.array.isRequired,
}