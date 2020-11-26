import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const padding = '40px';
const actionHeight = '46px';

export const BookInfo = ({ bookInfo, setShowBookInfo, addToCart, shoppingCart }) => {
    // console.log('bookinfo: ', bookInfo);
    const titleRef = useRef(null);
    const [titleHeight, setTitleHeight] = useState(0);
    const useStyles = makeStyles({
        root: {
            minWidth: 275,
            height: '100%'
        },
        pos: {
            marginBottom: 12,
        },
        container: {
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%'
        },
        cardWrapper: {
            width: 500,
            height: `calc(100% - ${padding})`
        },
        cardContent: {
            height: `calc(100% - ${padding} - ${actionHeight})`
        },
        cardTitle: {
            fontSize: '1.8rem'
        },
        cardMainContent: {
            overflow: 'auto',
            
        },
        cardNormalText: {
            fontSize: '1.3rem',
            marginTop: 15
        },
        coverContainer: {
            width: '400px',
            height: 'calc(100% - 40px)' 
        },
        cardActions: {
            padding: 0,
            justifyContent: 'center'
        }
    });
    const classes = useStyles();

    useEffect(() => {
        let timer = setTimeout(() => {
            const titleHeight = titleRef.current.clientHeight;
            setTitleHeight(titleHeight);
        }, 1)
        return () => clearTimeout(timer);
    }, [titleRef.current?.clientHeight, bookInfo.title])

    const {
        authors, categories, description, dimensions,
        format, id, imageStream, isbn10, isbn13,
        language, price, publicanCountry, publisher,
        rank, title
    } = bookInfo;

    return (
        <div className={classes.container}>
            <div className={classes.cardWrapper}>
                <Card className={classes.root}>
                    <CardContent className={classes.cardContent}>
                        <Typography id="title" variant="h5" component="h2" className={classes.cardTitle} ref={titleRef}>
                            {title}
                        </Typography>
                        {titleHeight > 0 ? 
                            <div className={classes.cardMainContent} style={{height: `calc(100% - ${titleHeight}px)`}}>
                                <Typography className={classes.cardNormalText}>
                                    Description
                                </Typography>
                                <Typography variant="body2" component="p" color="textSecondary">
                                    {description}
                                </Typography>
                                <Typography className={classes.cardNormalText}>
                                    Authors
                                </Typography>
                                <Typography variant="body2" component="p" color="textSecondary">
                                    {authors.join(', ')}
                                </Typography>
                                <Typography className={classes.cardNormalText}>
                                    Categories
                                </Typography>
                                <Typography variant="body2" component="p" color="textSecondary">
                                    {categories.join(', ')}
                                </Typography>
                                <Typography className={classes.cardNormalText}>
                                    Language
                                </Typography>
                                <Typography variant="body2" component="p" color="textSecondary">
                                    {language}
                                </Typography>
                                <Typography className={classes.cardNormalText}>
                                    Publisher
                                </Typography>
                                <Typography variant="body2" component="p" color="textSecondary">
                                    {publisher}
                                </Typography>
                                <Typography className={classes.cardNormalText}>
                                    Publican Country
                                </Typography>
                                <Typography variant="body2" component="p" color="textSecondary">
                                    {publicanCountry}
                                </Typography>
                            </div>
                        : <span/>}
                    </CardContent>
                    <CardActions className={classes.cardActions}>
                        <IconButton onClick={e => addToCart(e, {id, title, price})}>
                            <ShoppingCartIcon htmlColor={shoppingCart.filter(item => item.id === id).length > 0 ? 'red' : ''}/>
                        </IconButton>
                        <IconButton onClick={() => setShowBookInfo(false)}>
                            <CloseIcon />
                        </IconButton>
                    </CardActions>
                </Card>
            </div>
            <div className={classes.coverContainer}>
                <img src={`data:image/jpeg;base64,${imageStream}`} width="100%" height="auto"/>
            </div>
        </div>
    );
}

BookInfo.propTypes = {
    bookInfo: PropTypes.shape({
        authors: PropTypes.arrayOf(PropTypes.string).isRequired,
        categories: PropTypes.arrayOf(PropTypes.string).isRequired,
        description: PropTypes.string.isRequired,
        dimensions: PropTypes.string.isRequired,
        format: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        imageStream: PropTypes.string.isRequired,
        isbn10: PropTypes.string.isRequired,
        isbn13: PropTypes.string.isRequired,
        language: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        publicanCountry: PropTypes.string.isRequired,
        publicationDate: PropTypes.string.isRequired,
        publisher: PropTypes.string.isRequired,
        rank: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
    }).isRequired,
    setShowBookInfo: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired,
    shoppingCart: PropTypes.array.isRequired,
}