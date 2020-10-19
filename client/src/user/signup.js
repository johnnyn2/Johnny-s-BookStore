import React, {useState} from 'react';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import _ from 'underscore';
import {SIGNUP, getAlreadyExistErrorText} from '../constants/constants';
import {validator} from '../util/validator';
import { signup, checkUsernameAvailability, checkEmailAvailability } from '../util/api';
import { Typography, Button, InputLabel, IconButton, Input, InputAdornment, FormHelperText, TextField, Container, FormControl } from '@material-ui/core';
import PropTypes from 'prop-types';

export const SignUp = (props) => {
    const initState = {
        name: {
            value: "",
            error: false,
            errorText: ""
        },
        username: {
            value: "",
            error: false,
            errorText: ""
        },
        password: {
            value: "",
            error: false,
            errorText: "",
            showPassword: false,
        },
        email: {
            value: "",
            error: false,
            errorText: ""
        }
    }
    const [state, setState] = useState(initState);

    const handleInput = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        setState(prevState => ({
            ...prevState,
            [name]: {
                ...prevState[name],
                value,
            }
        }))
        validateInput(name, value);
    }

    const validateInput = (name, value) => {
        const min = SIGNUP[name].min;
        const max = SIGNUP[name].max;
        const regex = SIGNUP[name].regex;
        const helperText = SIGNUP[name].helperText;
        const {error, errorText} = validator(value, min, max, helperText, regex);
        setState(prevState => ({
            ...prevState,
            [name]: {
                ...prevState[name],
                error,
                errorText,
            }
        }))
    }

    const checkUsernameOrEmailAvailability = (field) => {
        if (!state[field].error) {
            if (field === "username") {
                checkUsernameAvailability(state.username.value)
                .then(res => {
                    if (!res.available) {
                        setState((prevState) => ({
                            ...prevState,
                            username: {
                                ...prevState.username,
                                error: true,
                                errorText: getAlreadyExistErrorText("Username"),
                            }
                        }))
                    }
                }).catch(err => console.log(err));
            } else if (field === "email") {
                checkEmailAvailability(state.email.value)
                .then(res => {
                    if (!res.available) {
                        setState((prevState) => ({
                            ...prevState,
                            email: {
                                ...prevState.email,
                                error: true,
                                errorText: getAlreadyExistErrorText("Email"),
                            }
                        }))
                    }
                }).catch(err => console.log(err));
            }
        }
    }

    const isFormReady = () => {
        let isReady = true;
        Object.keys(state).forEach(key => {
            if (state[key].error || state[key].value === '') {
                isReady = false;
            }
        })
        return isReady;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const request = {};
        Object.keys(state).forEach(key => {
            request[key] = state[key].value;
        })
        signup(request)
        .then(res => {
            props.history.push("/login");
            props.setSnackBar({
                open: true,
                message: "You have succesfully registered",
                severity: "success"
            })
        }).catch(err => {
            props.setSnackBar({
                open: true,
                message: "Something went wrong",
                severity: "error"
            })
        })
    }

    const isFormValid = isFormReady();

    const classes = {
        mt: {
            marginTop: 10,
        },
    }

    return (
        <Container maxWidth="md" style={{paddingTop: 20}}>
            <Typography display="block" variant="h4" color="primary">Sign Up</Typography>
            <TextField
                id="username-input"
                name="username"
                label="Username"
                value={state.username.value}
                fullWidth
                onChange={(e) => handleInput(e)}
                onBlur={() => checkUsernameOrEmailAvailability('username')}
                error={state.username.error}
                helperText={state.username.errorText}
            /> 
            <FormControl fullWidth error={state.password.error} style={classes.mt}>
                <InputLabel htmlFor="password-input">Password</InputLabel>
                <Input
                    id="password-input"
                    name="password"
                    type={state.password.showPassword ? 'text' : 'password'}
                    value={state.password.value}
                    onChange={(e) => handleInput(e)}
                    autoComplete="current-password"
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setState(prevState => {
                                const newState = {...prevState};
                                newState.password.showPassword = !newState.password.showPassword;
                                return newState;
                            })}
                        >
                        {state.password.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                    }
                />
                <FormHelperText id="password-error-helperText">{state.password.errorText}</FormHelperText>
            </FormControl>
            <TextField
                id="name-input"
                name="name"
                label="Name"
                value={state.name.value}
                fullWidth
                onChange={e => handleInput(e)}
                error={state.name.error}
                helperText={state.name.errorText}
                style={classes.mt}
            />
            <TextField
                id="email-input"
                name="email"
                label="Email"
                value={state.email.value}
                fullWidth
                onChange={e => handleInput(e)}
                onBlur={() => checkUsernameOrEmailAvailability('email')}
                error={state.email.error}
                helperText={state.email.errorText}
                style={classes.mt}
            />
            <div style={{display:'flex', width: '100%', justifyContent: 'center', marginTop: 20}}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={e => handleSubmit(e)}
                    disabled={!isFormValid}
                >
                    Submit
                </Button>
                <Button
                    style={{marginLeft: 10}}
                    variant="contained"
                    color="secondary"
                    onClick={() => setState(initState)}
                    disabled={_.isEqual(state, initState)}
                >
                    Reset
                </Button>
            </div>
        </Container>
    );
}

SignUp.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }),
    setSnackBar: PropTypes.func.isRequired,
}

export default SignUp;