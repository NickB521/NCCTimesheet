import React from 'react';

export const Denied = (props) => {
	return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="50px" 
            height="50px" 
            viewBox="0 0 24 24" 
            {...props}
        >
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"></path>
        </svg>
    );
}