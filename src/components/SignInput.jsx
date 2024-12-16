import React, { useState } from "react";
import { Eye, EyeClosed } from "../assets/icons/sign-in";
import { Input } from "@nextui-org/react";

const SignInput = ({ type, placeholder, startContent, endContent, isPassword, info, setInfo, worksiteOptions }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState([]);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const inputType = isPassword ? (isVisible ? "text" : "password") : type;

    const handleInputChange = (inp) => {
        setInfo(inp);

        if (type === "worksite" && worksiteOptions) {
            const matches = worksiteOptions.filter((worksiteOptions) =>
                worksiteOptions.toLowerCase().includes(inp.toLowerCase())
            );
            setFilteredOptions(matches);
        }
    };

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