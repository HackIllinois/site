import React from "react";
import clsx from "clsx";
import "./DropdownItem.scss";

interface DropdownItemProps {
    option: string;
    onClick: (option: string) => void;
    isFocused: boolean;
}

const DropdownItem: React.FC<DropdownItemProps> = ({
    option,
    onClick,
    isFocused
}) => {
    return (
        <li
            className={clsx("dropdown-option", isFocused && "focused")}
            onClick={() => onClick(option)}
        >
            {option}
        </li>
    );
};

export default DropdownItem;
