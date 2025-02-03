export const Seperator = (props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={70} height={90} viewBox="0 0 20 20" {...props}>
            <path 
                fill="#ECC644" 
                fillRule="evenodd" 
                d="M10 .5a.5.5 0 0 0-.5.5v18a.5.5 0 0 0 1 0V1a.5.5 0 0 0-.5-.5" 
                clipRule="evenodd"
            />
        </svg>
    );
}