import React, { useState } from "react";
import { Eye, EyeClosed } from "../assets/icons/sign-in";
import { Input } from "@nextui-org/react";

const SignInput = ({ placeholder, startContent, endContent, info, setInfo, worksiteOptions }) => {

    //Initalizes 2 states isVisibile is used to show and hide password 
    //FilterOptions is used while the user is typing a worksite
    const [isVisible, setIsVisible] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState([]);

    //Toggles the isVisible state
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    //Handles the input type depending on what placeHolder is used
    const inputType = (placeholder == "Password") ? (isVisible ? "text" : "password") : "text";

    //Handles any input change and handles filtering of possible worksites
    const handleInputChange = (inp) => {
        setInfo(inp);
        if (placeholder === "Worksite" && worksiteOptions) {
            const matches = worksiteOptions.filter((worksiteOptions) =>
                worksiteOptions.toLowerCase().includes(inp.toLowerCase())
            );
            setFilteredOptions(matches);
        }
    };

    //this changes info based on which worksite is selected and clears the filtered list
    const handleOptionClick = (worksiteOptions) => {
        setInfo(worksiteOptions);
        setFilteredOptions([]);
    };

    return (
        <div className="sign-in-input flex w-full flex-wrap md:flex-nowrap gap-4 relative">
            <Input
                type={inputType}
                value={info}
                placeholder={placeholder}
                radius="full"
                startContent={startContent}
                onValueChange={(inp) => handleInputChange(inp)}
                endContent={
                    placeholder == "Password" ? (
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
            {placeholder === "Worksite" && filteredOptions.length > 0 && (
                <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md z-10 overflow-y-auto" style={{ marginTop: "80px", maxHeight: "120px" }}>
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

export default SignInput;