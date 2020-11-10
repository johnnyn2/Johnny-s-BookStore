import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Tools} from '../components/Tools';
import {Books} from '../components/Books';
import {searchBooksByFilter} from '../util/api';

export const Store = ({currentUser, setSnackBar}) => {
    const [data, setData] = useState({
        content: [],
        last: true,
        page: 0,
        size: 0,
        totalElements: 0,
        totalPages: 0
    });
    return (
        <React.Fragment>
            <div style={{display: 'flex', padding: '20px', flex: 1}}>
                <Tools setData={setData} />
                <Books data={data} currentUser={currentUser} setSnackBar={setSnackBar}/>
            </div>
        </React.Fragment>
    );
}

Store.propTypes = {
    currentUser: PropTypes.shape({
        name: PropTypes.string,
        username: PropTypes.string,
        email: PropTypes.string
    })
}

export default Store;