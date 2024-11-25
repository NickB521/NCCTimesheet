import React, { useState } from "react";
import { User, Eye, EyeClosed, Lock, Email, Worksite } from "../assets/icons/sign-in";
import { Input } from "@nextui-org/react";
import { Link } from "react-router-dom";

const SignInput = ({ type, placeholder, startContent, endContent, isPassword, worksiteOptions }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [filteredOptions, setFilteredOptions] = useState([]);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const inputType = isPassword ? (isVisible ? "text" : "password") : type;

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        if (type === "worksite" && worksiteOptions) {
            const matches = worksiteOptions.filter((worksiteOptions) =>
                worksiteOptions.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredOptions(matches);
        }
    };

    const handleOptionClick = (worksiteOptions) => {
        setInputValue(worksiteOptions);
        setFilteredOptions([]);
    };

    return (
        <div className="sign-in-input flex w-full flex-wrap md:flex-nowrap gap-4 relative">
            <Input
                type={inputType}
                placeholder={placeholder}
                radius="full"
                startContent={startContent}
                value={inputValue}
                onChange={handleInputChange}
                endContent={
                    isPassword ? (
                        <button
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
            {type === "worksite" && filteredOptions.length > 0 && (
                <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md z-10 overflow-y-auto" style={{marginTop: "80px", maxHeight: "120px"}}>
                    {filteredOptions.map((worksiteOptions, index) => (
                        <li
                            key={index}
                            onClick={() => handleOptionClick(worksiteOptions)}
                            className="p-2 cursor-pointer hover:bg-gray-100"
                        >
                            {worksiteOptions}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const SignUp = () => {
    const worksites = ["Code Differently", "Ice Cream Parlor", "Library", "Site 4", "Site 5"];

    return (
        <>
            <div id="sign-in">
                <div id="sign-in-card">
                    <div id="sign-in-title">Sign Up</div>

                    <SignInput
                        type="email"
                        placeholder="Email"
                        startContent={<Email />}
                    />

                    <SignInput
                        type="username"
                        placeholder="Username"
                        startContent={<User />}
                    />

                    <SignInput
                        isPassword={true}
                        placeholder="Password"
                        startContent={<Lock />}
                    />

                    <SignInput
                        type="worksite"
                        placeholder="Worksite"
                        startContent={<Worksite />}
                        worksiteOptions={worksites}
                    />

                    <div id="sign-in-button-div">
                        <Link to="/" style={{ width: "100%" }}>
                            <button id="sign-in-button">Sign Up</button>
                        </Link>
                    </div>

                    <div id="sign-in-text" style={{ textAlign: "center" }}>
                        <Link to="/sign-in" style={{ width: "100%" }}>
                            <p>Already Have An Account?</p>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;
