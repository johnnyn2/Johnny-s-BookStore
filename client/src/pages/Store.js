import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Tools} from '../components/Tools';
import {Books} from '../components/Books';

export const Store = ({currentUser, setSnackBar}) => {
    const [data, setData] = useState({
        content: [],
        last: true,
        page: 0,
        size: 0,
        totalElements: 0,
        totalPages: 0
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [showBookInfo, setShowBookInfo] = useState(false);
    const [showBookId, setShowBookId] = useState(-1);
    return (
        <React.Fragment>
            <div style={{display: 'flex', padding: '20px', flex: 1}}>
                <Tools currentPage={currentPage} setData={setData} setShowBookInfo={setShowBookInfo}/>
                <Books
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    data={data}
                    currentUser={currentUser}
                    setSnackBar={setSnackBar}
                    showBookInfo={showBookInfo}
                    setShowBookInfo={setShowBookInfo}
                    showBookId={showBookId}
                    setShowBookId={setShowBookId}
                />
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