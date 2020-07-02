import React, {useState, useEffect} from 'react';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Typography, Button, InputLabel, IconButton, Input, InputAdornment, FormHelperText, TextField, Container, FormControl } from '@material-ui/core';
import _ from 'underscore';
import {SIGNIN, ACCESS_TOKEN} from '../constants/constants';
import {validator} from '../util/validator';
import {signin} from '../util/api';

export const Login = (props) => {
    const initState = {
        usernameOrEmail: {
            value: "",
            error: false,
            errorText: ""
        },
        password: {
            value: "",
            error: false,
            errorText: "",
            showPassword: false
        }
    };
    const [state, setState] = useState(initState);

    useEffect(()=>{
        const handleKeyDown = e => {
            switch(e.keyCode) {
                case 13:
                    props.setSnackBar({
                        open: true,
                        message: "Signing in...",
                        severity: "info"
                    })
                    handleSubmit(e); break;      
                default:
            }
        }
        document.addEventListener("keydown", handleKeyDown);

        return () => document.removeEventListener("keydown", handleKeyDown);
    },[state])

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
        const min = SIGNIN[name].min;
        const max = SIGNIN[name].max;
        const regex = SIGNIN[name].regex;
        const helperText = SIGNIN[name].helperText;
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
        if (!isFormReady()) {
            return;
        }
        const request = {};
        Object.keys(state).forEach(key => {
            request[key] = state[key].value;
        })
        signin(request)
        .then(res => {
            localStorage.setItem(ACCESS_TOKEN, res.accessToken);
            props.onLogin();
        }).catch(err => {
            props.setSnackBar({
                open: true,
                message: "Invalid username or password",
                severity: "error"
            })
        })
    }

    const isFormValid = isFormReady();
    return (
        <Container maxWidth="md" style={{paddingTop: 20}}>
            <Typography display="block" variant="h4" color="primary">Sign In</Typography>
            <TextField
                id="username-or-email-input"
                name="usernameOrEmail"
                label="Username"
                value={state.usernameOrEmail.value}
                fullWidth
                onChange={(e) => handleInput(e)}
                error={state.usernameOrEmail.error}
                helperText={state.usernameOrEmail.errorText}
            /> 
            <FormControl fullWidth error={state.password.error}>
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

export default Login;