import React, {useState, useEffect} from 'react';
import {Tools} from '../components/Tools';
import {Books} from '../components/Books';

export const Store = () => {
    const [selectedCategoryId, setSelectedCategoryId] = useState(-1);
    const [bookName, setBookName] = useState('');
    const [authorName, setAuthorName] = useState('');
    return (
        <React.Fragment>
            <div style={{display: 'flex', padding: '20px', flex: 1}}>
                <Tools
                    selectedCategoryId={selectedCategoryId}
                    setSelectedCategoryId={setSelectedCategoryId}
                    bookName={bookName}
                    authorName={authorName}
                    setBookName={setBookName}
                    setAuthorName={setAuthorName}
                />
                <Books
                    categoryId={selectedCategoryId}
                    bookName={bookName}
                    authorName={authorName}
                />
            </div>
        </React.Fragment>
    );
}

export default Store;