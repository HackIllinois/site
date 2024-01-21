import { SVGProps } from "react";

type Props = {} & SVGProps<SVGSVGElement>;

export const CloseIcon = (props: Props) => {
    return (
        <svg
            width="20"
            height="19"
            viewBox="0 0 20 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M18.4141 1L1.41406 18"
                stroke="#FFB23E"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <path
                d="M1 1L18 18"
                stroke="#FFB23E"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
};
