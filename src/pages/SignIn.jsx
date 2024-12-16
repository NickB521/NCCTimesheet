import React, { useState } from "react";
import { Email, Lock } from "../assets/icons/sign-in";
import { useNavigate } from "react-router-dom";
import SignInput from "../components/SignInput";


const SignIn = () => {
    
    const [pass, setPass] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const LogIn = () => {
        if(email && pass && (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email))){
            navigate("/");
        }
        
    }
    
    const SignUp = () => {
        navigate("/sign-up");
    }

    return (
        <>
            <div id="sign-in">
                <div id="sign-in-card">
                    <div id="sign-in-title">Sign In</div>
                    
                    <SignInput
                        type="text"
                        placeholder="Email"
                        startContent={<Email />}
                        info={email}
                        setInfo={setEmail}
                    />

                    <SignInput
                        isPassword={true}
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
