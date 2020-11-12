import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    pos: {
        marginBottom: 12,
    },
});

export const BookInfo = ({ bookInfo }) => {
    // console.log('bookinfo: ', bookInfo);
    const classes = useStyles();
    const titleRef = useRef(null);
    const [titleHeight, setTitleHeight] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            const titleHeight = titleRef.current.clientHeight;
            setTitleHeight(titleHeight);
        }, 1)
    }, [titleRef.current?.clientHeight])

    const {
        authors, categories, description, dimensions,
        format, id, imageStream, isbn10, isbn13,
        language, price, publicanCountry, publisher,
        rank, title
    } = bookInfo;

    return (
        <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 500, height:'calc(100% - 40px)' }}>
                <Card className={classes.root} style={{height: 'calc(100% - 40px)'}}>
                    <CardContent style={{height: 'calc(100% - 40px - 46px)'}}>
                        <Typography id="title" variant="h5" component="h2" style={{fontSize: '1.8rem'}} ref={titleRef}>
                            {title}
                        </Typography>
                        <div style={{overflow: 'auto', height: `calc(100% - ${titleHeight}px)`}}>
                            <Typography style={{fontSize: '1.3rem', marginTop: 15}}>
                                Description
                            </Typography>
                            <Typography variant="body2" component="p" color="textSecondary">
                                {description}
                            </Typography>
                            <Typography style={{fontSize: '1.3rem', marginTop: 15}}>
                                Authors
                            </Typography>
                            <Typography variant="body2" component="p" color="textSecondary">
                                {authors.join(', ')}
                            </Typography>
                            <Typography style={{fontSize: '1.3rem', marginTop: 15}}>
                                Categories
                            </Typography>
                            <Typography variant="body2" component="p" color="textSecondary">
                                {categories.join(', ')}
                            </Typography>
                            <Typography style={{fontSize: '1.3rem', marginTop: 15}}>
                                Language
                            </Typography>
                            <Typography variant="body2" component="p" color="textSecondary">
                                {language}
                            </Typography>
                            <Typography style={{fontSize: '1.3rem', marginTop: 15}}>
                                Publisher
                            </Typography>
                            <Typography variant="body2" component="p" color="textSecondary">
                                {publisher}
                            </Typography>
                            <Typography style={{fontSize: '1.3rem', marginTop: 15}}>
                                Publican Country
                            </Typography>
                            <Typography variant="body2" component="p" color="textSecondary">
                                {publicanCountry}
                            </Typography>
                        </div>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Close</Button>
                    </CardActions>
                </Card>
            </div>
            <div style={{ width: 300 }}>

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
}