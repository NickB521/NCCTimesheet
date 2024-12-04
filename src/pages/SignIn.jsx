import React, { useState } from "react";
import { User, Eye, EyeClosed, Lock } from "../assets/icons/sign-in";
import { Input } from "@nextui-org/react";
import { Link } from "react-router-dom";

const SignInput = ({ type, placeholder, startContent, endContent, isPassword }) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const inputType = isPassword ? (isVisible ? "text" : "password") : type;

    return (
        <div className="sign-in-input flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input
                type={inputType}
                placeholder={placeholder}
                radius="full"
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
    return (
        <>
            <div id="sign-in">
                <div id="sign-in-card">
                    <div id="sign-in-title">Sign In</div>
                    
                    <SignInput
                        type="text"
                        placeholder="Username"
                        startContent={<User />}
                    />

                    <SignInput
                        isPassword={true}
                        placeholder="Password"
                        startContent={<Lock />}
                    />

                    <div id="sign-in-text">
                        <p>Forgot Password?</p>
                    </div>

                    <div id="sign-in-button-div">
                        <Link to="/" style={{ width: "100%" }}>
                            <button id="sign-in-button">Sign In</button>
                        </Link>
                    </div>

                    <div id="sign-in-text" style={{ textAlign: "center" }}>
                        <Link to="/sign-up" style={{ width: "100%" }}>
                            <p>Sign Up Today!</p>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignIn;
