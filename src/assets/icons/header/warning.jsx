import React from 'react';

export const Warning = (props) => {
	return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20px" 
            height="20px" 
            viewBox="0 0 24 24" 
            {...props}
        >
            <path fill="currentColor" d="M12 20a7 7 0 0 1-7-7a7 7 0 0 1 7-7a7 7 0 0 1 7 7a7 7 0 0 1-7 7m7.03-12.61l1.42-1.42c-.45-.51-.9-.97-1.41-1.41L17.62 6c-1.55-1.26-3.5-2-5.62-2a9 9 0 0 0-9 9a9 9 0 0 0 9 9c5 0 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61M11 14h2V8h-2m4-7H9v2h6z"></path>
        </svg>
    );
}