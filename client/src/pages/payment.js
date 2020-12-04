import React, {useEffect, useState} from 'react';
import Card from '@material-ui/core/Card';
import { Button, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import {EnhancedTable} from '../components/EnhancedTable';
import {getBooksByIds, addOrder} from '../util/api';
import CircularProgress from '@material-ui/core/CircularProgress';

export const Payment = ({currentUser, setSnackBar}) => {
    const [bookData, setBookData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));
        if (typeof shoppingCart !== 'undefined' && shoppingCart !== null) {
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
        }
    }, [])

    const removeItem = (ids) => {
        const remainingBookData = bookData.filter(item => !ids.includes(item.id));
        setBookData(remainingBookData);
        const newShoppingCart = remainingBookData.map(item => ({id: item.id, title: item.title, price: item.price}));
        localStorage.setItem('shoppingCart', JSON.stringify(newShoppingCart));
    }

    const removeAll = () => {
        setBookData([]);
        localStorage.setItem('shoppingCart', JSON.stringify([]))
    }

    const submitOrder = () => {
        setIsLoading(true);
        addOrder({
            bookIds: bookData.map(book => book.id),
            amount: bookData.map(book => book.price).reduce((a, b) => a + b),
            userId: currentUser.id
        }).then(res => {
            if (res.status === 'success') {
                removeAll();
                setSnackBar({open: true, message: 'Payment completed. You will receive an email shortly.', severity: 'success'})
            }
            setIsLoading(false);
        }).catch(err => {
            console.log(err);
            setIsLoading(false);
        })
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
            <div style={{margin: 40, height: 'calc(100% - 80px)', position: 'relative'}}>
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
                        <Button
                            onClick={() => submitOrder()}
                            color="primary"
                            size="medium"
                            variant="contained"
                            style={{width: '150px'}}
                            disabled={bookData.length === 0 || isLoading}
                        >Purchase</Button>
                    </div>
                </div>
                <div id="overlay" style={{
                    position: 'absolute',
                    width: '100%', height: '100%',
                    zIndex: 10,
                    top: 0,
                    left: 0,
                    visibility: isLoading ? 'visible' : 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <CircularProgress/>
                </div>
                
            </div>
        </Card>
    );
}

Payment.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    currentUser: PropTypes.shape({
        id: PropTypes.number,
        username: PropTypes.string,
        name: PropTypes.string
    }),
    setSnackBar: PropTypes.func.isRequired
}