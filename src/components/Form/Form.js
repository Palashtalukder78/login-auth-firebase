import { Button, Checkbox, FormControl, FormControlLabel, TextField } from '@mui/material';
import './Form.css';
import avatar from '../../images/avatar.jpg'

import { GoogleAuthProvider, getAuth, signInWithPopup, GithubAuthProvider, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import initializeGoogleAuthentication from '../../Firebase/Firebase.initialize';
import { useState } from 'react';
import { useHistory } from 'react-router';
initializeGoogleAuthentication();

const Form = () => {
    const [logedUser, setLogedUser] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [password, setPassword] = useState('');
    const [isToggle, setIsToggle] = useState(false);
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    const gitProvider = new GithubAuthProvider();
    const history = useHistory();
    const handleGoogle = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                console.log(result.user);
                setLogedUser(result.user);
                history.push('/dashBoard')
            });
    }
    const handleGithub = () => {
        signInWithPopup(auth, gitProvider)
            .then(result => {
                setLogedUser(result.user)
                history.push('/dashBoard')
            })
    }
    const handleEmailChanges = e => {
        setEmail(e.target.value);
    }
    const handlePasswordChanges = e => {
        setPassword(e.target.value);
    }
    const handleUserName = e => {
        setName(e.target.value);
    }
    const handleToggle = e => {
        setIsToggle(e.target.checked);
    }
    const handleRegister = e => {
        e.preventDefault();
        if (password.length < 6) {
            setError("Password should be 6 Character")
        }
        isToggle ? processedUser(email, password) : createNewUser(email, password)
    }
    const createNewUser = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setError('');
                verifyEmail();
                setUserName();
                history.push('/emailVerify')
            })
            .catch(error => {
                setError(error.message)
            })
    }
    const processedUser = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user)
                setError('');
                history.push('/dashboard')
            })
            .catch(error => {
                setError(error.message)
            })
    }
    const setUserName = () => {
        updateProfile(auth.currentUser, {
            displayName: name,
        })
            .then(result => {
                console.log(result.name);
            })

    }
    const verifyEmail = () => {
        sendEmailVerification(auth.currentUser)
            .then(result => {
                console.log(result)
            })
    }
    const handleResetPassword = () => {
        sendPasswordResetEmail(auth, email)
            .then(result => {
                console.log(result);
            })
    }
    return (
        <div id="my-form">
            <img style={{ width: "70px", height: "70px", borderRadius: "50%", margin: "10px auto", }} src={logedUser ? logedUser.photoURL : avatar} alt="" />
            <h2 style={{ margin: "0", padding: "0" }}>{isToggle ? "Login" : "Register"}</h2>
            <small style={{ color: "red" }}>{error}</small>
            <form onSubmit={handleRegister}>
                <FormControl sx={{ m: 1, width: '85%' }}>
                    {!isToggle &&
                        <TextField onBlur={handleUserName} id="outlined-name-basic" label="Full Name" variant="outlined" type="text" />
                    }
                    <TextField style={{ margin: "13px 0" }} id="outlined-email-basic" variant="outlined" type="email" label="Email Address" onBlur={handleEmailChanges} required />
                    <TextField id="outlined-password-input" label="Password" type="password" autoComplete="current-password" onBlur={handlePasswordChanges} required
                    />
                    <div className="flexible">
                        <FormControlLabel
                            control={<Checkbox />}
                            labelPlacement="end"
                            style={{ margin: ' 0 0 0 0' }}
                            label="Already Registered?"
                            onChange={handleToggle}
                        />
                        {isToggle && <small onClick={handleResetPassword} className="forgot">Reset Password</small>}
                    </div>
                    <Button type="submit" variant="contained">{isToggle ? "Login" : "Register"}</Button>
                </FormControl>
            </form>
            <h3>or register with</h3>
            <div className="icons">
                <button style={{ border: "none", backgroundColor: "#fff" }} onClick={handleGoogle}><i className="fab fa-google"></i></button>
                <button style={{ border: "none", backgroundColor: "#fff" }} onClick={handleGithub}><i className="fab fa-github"></i></button>
            </div>
        </div>
    );
};

export default Form;