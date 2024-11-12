export const Calendar = (props) => {
    return (
        <svg 
            width="48" 
            height="48" 
            viewBox="0 0 48 48"
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >

            <rect x="6" y="12" width="36" height="30" rx="2" stroke="#D9D9D9" strokeWidth="2"/>
            <path d="M6 16C6 14.1144 6 13.1716 6.58579 12.5858C7.17157 12 8.11438 12 10 12H38C39.8856 12 40.8284 12 41.4142 12.5858C42 13.1716 42 14.1144 42 16V20H6V16Z" fill="#D9D9D9"/>
            <path d="M14 6L14 12" stroke="#D9D9D9" strokeWidth="2" strokeLinecap="round"/>
            <path d="M34 6L34 12" stroke="#D9D9D9" strokeWidth="2" strokeLinecap="round"/>
        </svg>
    )
}