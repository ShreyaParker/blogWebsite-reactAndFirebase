import React from 'react';
import {auth,provider} from "../firebase-config";
import {signInWithPopup} from 'firebase/auth'
import {useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";

const Login = () => {
    let navigate=useNavigate()
    const signInWithGoogle = async() => {
        await signInWithPopup(auth,provider)
        navigate("/")
    }
    return (
        <div className="loginPage">
            <p>sign In with Google to Continue</p>
            <Button
                   variant={"outline-primary"}
                    onClick={signInWithGoogle}
            >
                Sign In With Google
            </Button>

        </div>
    );
};

export default Login;