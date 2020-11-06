import React, {useState, useEffect} from 'react';
import {Tools} from '../components/Tools';
import {Books} from '../components/Books';

export const Store = () => {
    const [selectedCategoryId, setSelectedCategoryId] = useState(-1);
    const [title, setTitle] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [search, setSearch] = useState();
    return (
        <React.Fragment>
            <div style={{display: 'flex', padding: '20px', flex: 1}}>
                <Tools
                    setSelectedCategoryId={setSelectedCategoryId}
                    setTitle={setTitle}
                    setAuthorName={setAuthorName}
                    handleSearch={() => {}}
                />
                <Books
                    categoryId={selectedCategoryId}
                    title={title}
                    authorName={authorName}
                />
            </div>
        </React.Fragment>
    );
}

export default Store;