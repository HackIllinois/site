import React from "react";
import "./DropdownItem.scss";

interface DropdownItemProps {
    option: string;
    onClick: (option: string) => void;
}

const DropdownItem: React.FC<DropdownItemProps> = ({ option, onClick }) => {
    return (
        <li className="dropdown-option" onClick={() => onClick(option)}>
            {option}
        </li>
    );
};

export default DropdownItem;
