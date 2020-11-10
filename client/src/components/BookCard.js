import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import {COLORS} from '../constants/constants';
import IconButton from '@material-ui/core/IconButton';
import StarIcon from '@material-ui/icons/Star';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        margin: '10px 40px',
    },
});

export const BookCard = ({
    id, title, description, categories,
    authors, imageStream, currentUser, setSnackBar, setShowBookInfo
}) => {
    const classes = useStyles();

    const addToCart = (e) => {
        if (currentUser) {
            console.log(currentUser);
        } else {
            console.log("no current user");
            setSnackBar({
                open: true,
                message: "Please sign in first",
                severity: "info"
            });
        }
    }

    return (
        <Card className={classes.root}>
            {/* <Link to={`/books/${id}`} style={{ textDecoration: 'none', color: COLORS.FONTS.BLACK }}> */}
                <CardActionArea onClick={setShowBookInfo}>
                    <CardMedia
                        component="img"
                        alt={title}
                        height="140"
                        image={`data:image/jpeg;base64,${imageStream}`}
                        title={title}
                    />
                    <CardContent style={{ height: 418, overflow: 'hidden', color: 'inherit' }}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p" style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                            {description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            {/* </Link> */}
            <CardActions>
                <IconButton>
                    <StarIcon />
                </IconButton>
                <IconButton onClick={e => addToCart(e)}>
                    <ShoppingCartIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}

BookCard.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    authors: PropTypes.arrayOf(PropTypes.string).isRequired,
    imageStream: PropTypes.string.isRequired,
    currentUser: PropTypes.shape({
        name: PropTypes.string,
        username: PropTypes.string,
        email: PropTypes.string
    }),
    setShowBookInfo: PropTypes.func.isRequired,
}

export default withRouter(BookCard);