export const Dashboard = (props) => {
    return (
        <svg 
            width="48" 
            height="48" 
            viewBox="0 0 48 48" 
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >

            <rect x="8" y="8" width="12" height="14" rx="1" stroke={ props.color } strokeWidth="2" strokeLinejoin="round"/>
            <rect x="8" y="30" width="12" height="10" rx="1" stroke={ props.color } strokeWidth="2" strokeLinejoin="round"/>
            <rect x="28" y="8" width="12" height="10" rx="1" stroke={ props.color } strokeWidth="2" strokeLinejoin="round"/>
            <rect x="28" y="26" width="12" height="14" rx="1" stroke={ props.color } strokeWidth="2" strokeLinejoin="round"/>
        </svg>
    )
}