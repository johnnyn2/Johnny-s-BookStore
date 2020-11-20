import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {BookRow} from '../components/BookRow';

export const BookGallery = ({scrollTop, setScrollTop, bookRows, currentUser, setSnackBar, setShowBookInfo, setShowBookId}) => {
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
                    currentUser={currentUser}
                    setSnackBar={setSnackBar}
                    setShowBookInfo={setShowBookInfo}
                    setShowBookId={setShowBookId}
                    setEndingScrollPosition={setScrollTop}
                    containerRef={containerRef}
                />)}
        </div>
    );
}

BookGallery.propTypes = {
    scrollTop: PropTypes.number.isRequired,
    setScrollTop: PropTypes.func.isRequired,
    bookRows: PropTypes.arrayOf(PropTypes.array).isRequired,
    currentUser: PropTypes.shape({
        name: PropTypes.string,
        username: PropTypes.string,
        email: PropTypes.string
    }),
    setShowBookInfo: PropTypes.func.isRequired,
    setShowBookId: PropTypes.func.isRequired,
}