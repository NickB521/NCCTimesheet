export const Requests = (props) => {
    return (
        <svg
            width="96"
            height="96"
            fill="none"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <circle stroke={ props.color } cx={15.5} cy={15.5} r={5.5} />
            <path stroke={ props.color } d="M15.5 13.344V15.5L17 17M17 3v2M7 3v2" />
            <path stroke={ props.color } d="M8.03 21H5.308c-.802 0-1.093-.078-1.386-.225a1.587 1.587 0 0 1-.68-.637C3.083 19.864 3 19.592 3 18.841V7.159c0-.75.084-1.023.24-1.297.157-.275.388-.49.68-.637C4.215 5.078 4.506 5 5.308 5h13.386c.802 0 1.093.078 1.386.225.293.147.524.362.68.637.157.274.241 1.385.241 2.135" />
        </svg>
    )
}