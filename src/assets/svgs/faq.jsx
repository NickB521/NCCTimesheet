import React from 'react';

export function Faq({size, height, width, ...props}) {
	return (
        <svg fill="none"
            height={size || height || 24}
            viewBox="0 0 24 24"
            width={size || width || 24}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21v-.5m0-3c0-5.1 5-3.825 5-8.924c0-6.768-10-6.768-10 0">
            </path>
        </svg>
    );
}