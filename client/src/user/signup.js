import React, {useState} from 'react';
import { signup } from '../util/api';

export const SignUp = (props) => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const request = {
            name,
            username,
            password,
            email,
        };
        signup(request)
        .then(res => {
            console.log('signup success: ', res);
            props.history.push("/login");
        }).catch(err => {
            console.log('signup error: ', err);
        })
    }


    return <span>SignUp</span>;
}

export default SignUp;