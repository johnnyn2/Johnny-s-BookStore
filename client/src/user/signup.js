import React, {useState} from 'react';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import _ from 'underscore';
import {SIGNUP} from '../constants/constants';
import {validator} from '../util/validator';
import { signup } from '../util/api';
import { Typography, Button, InputLabel, IconButton, Input, InputAdornment, FormHelperText, TextField, Container, FormControl } from '@material-ui/core';

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
        const {error, errorText} = validator(value, min, max, regex, helperText);
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
        const request = {
            ...state.form
        };
        signup(request)
        .then(res => {
            console.log('signup success: ', res);
            props.history.push("/login");
        }).catch(err => {
            console.log('signup error: ', err);
        })
    }

    const isFormValid = isFormReady();

    return (
        <Container maxWidth="md" style={{paddingTop: 20}}>
            <Typography display="block" variant="h4" color="primary">Sign Up</Typography>
            <TextField
                id="username-input"
                name="username"
                label="Username"
                value={state.username.value}
                fullWidth
                onChange={(e) => {
                    handleInput(e);
                    let error = false;
                    const errorText = ""
                    if (state.username.value.length < 3 || state.username.value.length > 15) {
                        error = true;
                        errorText = "The username should be 3 to 15 characters length.";
                    }

                }}
            /> 
            <FormControl fullWidth>
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
            </FormControl>
            <TextField
                id="name-input"
                name="name"
                label="Name"
                value={state.name.value}
                fullWidth
                onChange={e => handleInput(e)}
            />
            <TextField
                id="email-input"
                name="email"
                label="Email"
                value={state.email.value}
                fullWidth
                onChange={e => handleInput(e)}
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

export default SignUp;