import React, {useEffect, useState} from 'react';
import Card from '@material-ui/core/Card';
import { Button, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import {EnhancedTable} from '../components/EnhancedTable';
import {getBooksByIds} from '../util/api';

export const Payment = () => {
    const [bookData, setBookData] = useState([]);
    useEffect(() => {
        const shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));
        console.log('payment: ', shoppingCart);
        getBooksByIds(shoppingCart.map(item => item.id))
        .then(res => {
            console.log(res);
            const newBookData = res.map(book => {
                const {authors, categories, id, language, price, title} = book;
                const data = {
                    authors: authors.join(", "),
                    categories: categories.join(", "),
                    id,
                    language,
                    price,
                    title,
                };
                return data;
            });
            setBookData(newBookData);
        }).catch(err => console.log(err));
    }, [])

    const removeItem = (ids) => {
        const remainingBookData = bookData.filter(item => !ids.includes(item.id));
        setBookData(remainingBookData);
        const newShoppingCart = remainingBookData.map(item => ({id: item.id, title: item.title, price: item.price}));
        localStorage.setItem('shoppingCart', JSON.stringify(newShoppingCart));
    }

    const headCells = [
        { id: 'title', numeric: false, disablePadding: true, label: 'Title' },
        { id: 'authors', numeric: false, disablePadding: false, label: 'Author(s)' },
        { id: 'categories', numeric: false, disablePadding: false, label: 'Categorie(s)' },
        { id: 'language', numeric: false, disablePadding: false, label: 'Language' },
        { id: 'price', numeric: true, disablePadding: false, label: 'Price' },
    ];

    return (
        <Card style={{ display: 'flex', flexDirection: 'column', width: '100%', margin: 40, height: 'calc(100% - 80px)' }}>
            <div style={{margin: 40, height: 'calc(100% - 80px)'}}>
                <Typography  variant="h5" id="tableTitle">
                    Payment Details
                </Typography>
                <div style={{display: 'flex', flexDirection: 'column', height: 'calc(100% - 32px)'}}>
                    <EnhancedTable
                        headCells={headCells}
                        data={bookData}
                        removeItem={removeItem}
                    />
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <Typography variant="h5">Total : $ {bookData.length > 0 ? bookData.map(b => b.price).reduce((a, b) => a + b).toFixed(2) : 0}</Typography>
                        <Button color="primary" size="medium" variant="contained" style={{width: '150px'}}>Purchase</Button>
                    </div>
                </div>
            </div>
        </Card>
    );
}

Payment.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
}