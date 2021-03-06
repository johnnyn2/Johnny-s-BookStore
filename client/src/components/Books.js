import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import Card from '@material-ui/core/Card';
import {BookGallery} from './BookGallery';
import {BookInfo} from './BookInfo';
import {ITEMS_PER_ROW, ROWS_PER_PAGE} from '../constants/constants';
import {getBookById} from '../util/api';
import BookInfoModel from '../model/BookInfoModel';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export const Books = ({data, currentUser, setSnackBar, currentPage, setCurrentPage, showBookInfo, setShowBookInfo, showBookId, setShowBookId}) => {
    const classes = useStyles();
    
    const [bookInfo, setBookInfo] = useState(BookInfoModel);
    const [shoppingCart, setShoppingCart] = useState([]);
    const [bookMarks, setBookMarks] = useState([]);
    const [scrollTop, setScrollTop] = useState(0);

    useEffect(() => {
        if (currentUser.name !== '') {
            const shoppingCartStr = localStorage.getItem('shoppingCart');
            if (typeof shoppingCartStr !== null && shoppingCartStr !== null) {
                setShoppingCart(JSON.parse(shoppingCartStr));
            }
            const bookMarksStr = localStorage.getItem('bookMarks');
            if (typeof bookMarksStr !== null && bookMarksStr !== null) {
                setBookMarks(JSON.parse(bookMarksStr));
            }
        }
    }, [currentUser])

    useEffect(() => {
        if (showBookInfo) {
            getBookById(showBookId)
            .then(book => {
                setBookInfo(book);
            })
            .catch(err => console.error(err))
        } else {
            setBookInfo(BookInfoModel);
        }
    }, [showBookInfo])

    const addToCart = (e, cartItem) => {
        if (currentUser.name !== '') {
            if (shoppingCart.filter(item => item.id === cartItem.id).length === 0) {
                setShoppingCart(prevCart => {
                    const newCart = [...prevCart, cartItem];
                    localStorage.setItem('shoppingCart', JSON.stringify(newCart));
                    return newCart;
                });
            } else {
                setShoppingCart(prevCart => {
                    const newCart = [...prevCart.filter(item => item.id !== cartItem.id)];
                    localStorage.setItem('shoppingCart', JSON.stringify(newCart));
                    return newCart;
                })
            }
        } else {
            setSnackBar({
                open: true,
                message: "Please sign in first",
                severity: "info"
            });
        }
    }

    const addToBookMarks = (e, bookItem) => {
        if (currentUser.name !== '') {
            if (bookMarks.filter(item => item.id === bookItem.id).length === 0) {
                setBookMarks(prevCart => {
                    const newCart = [...prevCart, bookItem];
                    localStorage.setItem('bookMarks', JSON.stringify(newCart));
                    return newCart;
                });
            } else {
                setBookMarks(prevCart => {
                    const newCart = [...prevCart.filter(item => item.id !== bookItem.id)];
                    localStorage.setItem('bookMarks', JSON.stringify(newCart));
                    return newCart;
                })
            }
        } else {
            setSnackBar({
                open: true,
                message: "Please sign in first",
                severity: "info"
            });
        }
    }

    let bookRows = [];
    for(let i =0;i<Math.ceil(data.content.length / ITEMS_PER_ROW); i++) {
        let start = i * ITEMS_PER_ROW;
        let end = start + ITEMS_PER_ROW ;
        bookRows = [...bookRows, data.content.slice(start, end)];
    }

    return (
        <Card style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            {showBookInfo ?
                <BookInfo
                    setShowBookInfo={setShowBookInfo}
                    bookInfo={bookInfo}
                    addToCart={addToCart}
                    shoppingCart={shoppingCart}
                    addToBookMarks={addToBookMarks}
                    bookMarks={bookMarks}
                /> :
                <React.Fragment>
                    {data.content.length > 0 ?
                        <BookGallery
                            scrollTop={scrollTop}
                            setScrollTop={setScrollTop}
                            bookRows={bookRows}
                            currentUser={currentUser}
                            setSnackBar={setSnackBar}
                            setShowBookInfo={setShowBookInfo}
                            setShowBookId={setShowBookId}
                            addToCart={addToCart}
                            shoppingCart={shoppingCart}
                            addToBookMarks={addToBookMarks}
                            bookMarks={bookMarks}
                        />
                        :
                        <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            No results found
                        </div>
                    }
                    <div style={{ display: 'flex', height: '50px', margin: '20px', justifyContent: 'center', alignItems: 'center' }}>
                        <Pagination
                            count={data.totalPages}
                            color="primary"
                            page={currentPage}
                            onChange={(event, value) => { setCurrentPage(value); }}
                        />
                    </div>
                </React.Fragment>
            }
        </Card>
    );
}

Books.propTypes = {
    data: PropTypes.shape({
        content: PropTypes.arrayOf(PropTypes.object).isRequired,
        last: PropTypes.bool.isRequired,
        page: PropTypes.number.isRequired,
        size: PropTypes.number.isRequired,
        totalElements: PropTypes.number.isRequired,
        totalPages: PropTypes.number.isRequired,
    }).isRequired,
    currentUser: PropTypes.shape({
        name: PropTypes.string,
        username: PropTypes.string,
        email: PropTypes.string
    }),
    currentPage: PropTypes.number.isRequired,
    setCurrentPage: PropTypes.func.isRequired,
    showBookInfo: PropTypes.bool.isRequired,
    setShowBookInfo: PropTypes.func.isRequired,
    showBookId: PropTypes.number.isRequired,
    setShowBookId: PropTypes.func.isRequired,
}

export default Books;