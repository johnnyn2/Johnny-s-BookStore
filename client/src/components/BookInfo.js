import React from 'react';
import PropTypes from 'prop-types';

export const BookInfo = ({bookInfo}) => {
    console.log('bookinfo: ', bookInfo);

    return (
        <div>
            <div>

            </div>
            <div>
                
            </div>
        </div>
    );
}

BookInfo.propTypes = {
    bookInfo: PropTypes.shape({
        authors: PropTypes.arrayOf(PropTypes.string).isRequired,
        categories: PropTypes.arrayOf(PropTypes.string).isRequired,
        description: PropTypes.string.isRequired,
        dimensions: PropTypes.string.isRequired,
        format: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        imageStream: PropTypes.string.isRequired,
        isbn10: PropTypes.string.isRequired,
        isbn13: PropTypes.string.isRequired,
        language: PropTypes.string.isRequired,
        
    }).isRequired,
}