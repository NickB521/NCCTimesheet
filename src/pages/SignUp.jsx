import React, { useState } from "react";
import { Lock, Email, Worksite } from "../assets/icons/sign-in";
import { useNavigate } from "react-router-dom";
import SignInput from "../components/SignInput";


const SignUp = () => {
    const worksites = ["Code Differently", "Ice Cream Parlor", "Library", "Site 4", "Site 5"];
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [workSite, setWorkSite] = useState("");
    const navigate = useNavigate();

    //this checks if all needed information is filled out and validates if email is a email
    //THIS NEEDS TO BE ADJUSTED TO THE API CALLS FOR VALIDATION!!!!!!!!!
    const SignUp = () => {
        if (email && pass && workSite && (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email))) {
            navigate("/");
        }
    }

    //navigates the user to log-in
    const LogIn = () => {
        navigate("/sign-in");
    }
    
    return (
        <div id="sign-in">
            <div id="sign-in-card">
                <div id="sign-in-title">Sign Up</div>

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

                <SignInput
                    placeholder="Worksite"
                    startContent={<Worksite />}
                    info={workSite}
                    setInfo={setWorkSite}
                    worksiteOptions={worksites}
                />

                <div id="sign-in-button-div">
                        <button id="sign-in-button" onClick={SignUp}>Sign Up</button>
                </div>

                <div id="sign-in-text" style={{ textAlign: "center" }}>
                        <button onClick={LogIn}>Already Have An Account?</button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
