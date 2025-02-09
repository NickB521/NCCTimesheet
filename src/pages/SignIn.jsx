import React, { useState, useContext, useEffect } from "react";
import { Email, Lock } from "../assets/icons/sign-in";
import { useNavigate } from "react-router-dom";
import SignInput from "../components/SignInput";
import * as auth from "../Services/AuthService";
import * as userService from "../Services/UserService";
import Context from "../components/Context";


const SignIn = () => {

    const [pass, setPass] = useState("");
    const [email, setEmail] = useState("");
    const {token, setToken} = useContext(Context);
    const {user, setUser} = useContext(Context);
    const navigate = useNavigate();

    //this checks if all needed information is filled out and validates if email is a email
    const LogIn = () => {
        //comment block below out for developing if no back-end and uncomment next most line
        setToken("TEMP")
        // auth.authenticate(email, pass).then(response => {
        //     userService.getSelf(response.data.token).then(res => {
        //         setUser(res.data)
        //     })
        //     setToken(response.data.token)
            // localStorage.setItem("token", response.data.token)
        // })
    }

    //navigates the user to the sign-up page
    const SignUp = () => {
        navigate("/sign-up");
    }

    return (
        <>
            <div id="sign-in">
                <div id="sign-in-card">
                    <div id="sign-in-title">Sign In</div>

                    <SignInput
                        placeholder="Email"
                        startContent={<Email />}
                        info={email}
                        setInfo={setEmail}
                    />

                    <SignInput
                        placeholder="Password"
                        startContent={<Lock />}
                        info={pass}
                        setInfo={setPass}
                    />

                    <div id="sign-in-text">
                        <p>Forgot Password?</p>
                    </div>

                    <div id="sign-in-button-div">
                        <button id="sign-in-button" onClick={LogIn}>Sign In</button>
                    </div>

                    <div id="sign-in-text" style={{ textAlign: "center" }}>
                        <button onClick={SignUp}>Sign Up Today!</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignIn;
