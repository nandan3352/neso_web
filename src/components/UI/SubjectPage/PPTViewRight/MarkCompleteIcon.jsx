import { useTheme, SvgIcon } from "@material-ui/core"


const MarkComplete = ({ isComplete }) => {
    const theme = useTheme().palette.type

    const getTickColor = () => {
        return isComplete ? (theme === "light" ? "#BF232D" : "#f7e7ea") : "#666666"
    }

    const getCircleColor = () => {
        return isComplete ? (theme === "light" ? "#F2994A" : "#ff9089") : "#5c5c5c"
    }

    return (
        <SvgIcon>
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <rect
                    width="24"
                    height="24"
                    rx="12"
                    fill={getCircleColor()}
                    fill-opacity="0.16"
                />
                <path
                    d="M10.5 14.625L7.875 12L7 12.875L10.5 16.375L18 8.875L17.125 8L10.5 14.625Z"
                    fill={getTickColor()}
                />
            </svg>
        </SvgIcon>
    )
}


export default MarkComplete