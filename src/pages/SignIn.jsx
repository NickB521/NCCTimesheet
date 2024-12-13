import React, { useState } from "react";
import { Email, Eye, EyeClosed, Lock } from "../assets/icons/sign-in";
import { Input } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

const SignInput = ({ type, placeholder, startContent, endContent, isPassword, setInfo }) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const inputType = isPassword ? (isVisible ? "text" : "password") : type;

    return (
        <div className="sign-in-input flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input
                onValueChange={(inp) => setInfo(inp)}
                radius="full"
                placeholder={placeholder}
                type={inputType}
                startContent={startContent}
                endContent={
                    isPassword ? (
                        <button
                            className="focus:outline-none"
                            type="button"
                            onClick={toggleVisibility}
                        >
                            {isVisible ? (
                                <Eye className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                                <EyeClosed className="text-2xl text-default-400 pointer-events-none" />
                            )}
                        </button>
                    ) : (
                        endContent
                    )
                }
            />
        </div>
    );
};

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
                        setInfo={setEmail}
                    />

                    <SignInput
                        isPassword={true}
                        placeholder="Password"
                        startContent={<Lock />}
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
