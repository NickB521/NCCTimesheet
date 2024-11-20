import React, { useState } from "react";

import { User, Eye, EyeClosed, Lock } from "../assets/icons/sign-in";

import { Input } from "@nextui-org/react";

import { Link } from "react-router-dom";

const SignIn = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <>
            <div id="sign-in">
                <div id="sign-in-card">
                    <div id="sign-in-title">Sign In</div>
                    <div className="sign-in-input flex w-full flex-wrap md:flex-nowrap gap-4">
                        <Input
                            type="username"
                            placeholder="Username"
                            radius="full"
                            startContent={<User/>}
                        />
                    </div>
                    <div className="sign-in-input flex w-full flex-wrap md:flex-nowrap gap-4">
                        <Input
                            type={isVisible ? "text" : "password"}
                            placeholder="Password"
                            radius="full"
                            startContent={<Lock/>}
                            endContent={
                                <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                                    {isVisible ? (
                                        <Eye className="text-2xl text-default-400 pointer-events-none" />) 
                                        : (
                                        <EyeClosed className="text-2xl text-default-400 pointer-events-none" />)
                                    }
                                </button>
                            }
                        />
                    </div>
                    <div id="sign-in-text">
                        <p>Forgot Password?</p>
                    </div>
                    <div id="sign-in-button-div">
                        <Link to="/" style={{width: "100%"}}>
                            <button id="sign-in-button">Sign In</button>
                        </Link>
                    </div>
                    <div id="sign-in-text" style={{alignItems: "center"}}>
                        <p>Sign Up Today!</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignIn;