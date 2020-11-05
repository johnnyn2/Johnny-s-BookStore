import React, {useState, useEffect} from 'react';
import {Tools} from '../components/Tools';
import {Books} from '../components/Books';

export const Store = () => {
    const [selectedCategoryId, setSelectedCategoryId] = useState(-1);
    return (
        <React.Fragment>
            <div style={{display: 'flex', flex: 1, height: 'calc(100% - 64px - 20px)', margin: '20px'}}>
                <Tools
                    selectedCategoryId={selectedCategoryId}
                    setSelectedCategoryId={setSelectedCategoryId}
                />
                <Books categoryId={selectedCategoryId}/>
            </div>
        </React.Fragment>
    );
}

export default Store;