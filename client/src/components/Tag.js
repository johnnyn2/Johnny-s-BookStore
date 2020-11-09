import React from 'react';
import PropTypes from 'prop-types';

export const Tag = ({text}) => {
    return (
        <span style={{borderRadius: 20, padding: '0 20px'}}>
            {text}
        </span>
    )
}

Tag.propTypes = {
    text: PropTypes.string.isRequired
}
