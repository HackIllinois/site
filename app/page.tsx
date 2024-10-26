import React from "react";
import MainDropdown from "@/components/DropdownBox/MainDropdown";

const Home: React.FC = () => {
    const options = ["Option 1", "Option 2", "Option 3"];
    const name = "school";

    return (
        <MainDropdown options={options} name={name} />
    );
};

export default Home;
