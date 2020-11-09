import React, {useState, useEffect} from 'react';
import {Tools} from '../components/Tools';
import {Books} from '../components/Books';
import {searchBooksByFilter} from '../util/api';

export const Store = () => {
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
                <Books data={data} />
            </div>
        </React.Fragment>
    );
}

export default Store;