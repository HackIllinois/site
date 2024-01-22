import { StylesConfig } from "react-select";

const menuBackgroundColor = "#ADD8CD";
const menuHighlightColor = "#2C9C98";

const customStyles: StylesConfig<Record<string, unknown>, true | false> = {
    control: () => ({
        background: "transparent",
        borderBottom: "1px solid #FFFFFF",
        display: "flex",
        paddingBottom: 5
    }),
    valueContainer: base => ({
        ...base,
        paddingLeft: 0,
        overflow: "visible", 
        zIndex: 1000

    }),
    placeholder: base => ({
        ...base,
        color: "--text-color",
        fontWeight: 500,
        bottom: 0,
        top: "unset",
        transform: "none",
        fontSize: "1.1em",
        "::after": {
            content: '"*"',
            color: "#FE7098",
            marginLeft: "4px"
        }
    }),
    input: base => ({
        ...base,
        fontWeight: 500,
        fontFamily: "Montserrat",
        width: "100%",
        color: "#FFFFFF",
        "& > div, & > div > input": {
            fontWeight: "inherit",
            fontFamily: "inherit",
            width: "100% !important"
        }
    }),
    singleValue: base => ({
        ...base,
        color: "FFFFFF",
        fontWeight: 500,
        fontSize: "1.25em"
    }),
    multiValue: base => ({
        ...base,
        backgroundColor: "#A977AB",
        borderRadius: 100,
        padding: "0 2px"
    }),
    multiValueLabel: base => ({
        ...base,
        color: "#F6F4D4"
    }),
    multiValueRemove: base => ({
        ...base,
        color: "#F6F4D4",
        cursor: "pointer",
        "&:hover": {
            color: "white",
            backgroundColor: "transparent"
        }
    }),
    clearIndicator: () => ({
        color: "#F6F4D4",
        cursor: "pointer"
    }),
    indicatorSeparator: () => ({
        // visible: false,
        display: "none"
    }),
    dropdownIndicator: () => ({
        color: "#F6F4D4",
        cursor: "pointer"
    }),
    menuPortal: base => ({
        ...base,
        zIndex: 100,
        maxHeight: "10vh"
    }),
    menu: base => ({
        ...base,
        background: menuBackgroundColor,
        borderRadius: 20,
        padding: "0 15px",
        overflow: "visible",
        maxHeight: "25vh",
        zIndex: 10000,

        // transform: 'translateX(-26.7vw)',
        // width: base.width,
    }),
    menuList: base => ({
        ...base,
        padding: "16px 0",

        scrollbarColor: `${menuHighlightColor} transparent`,
        scrollbarWidth: "thin",
        maxHeight: "25vh",
        "&::-webkit-scrollbar": {
            WebkitAppearance: "none"
        },
        "&::-webkit-scrollbar:vertical": {
            width: 5
        },
        "&::-webkit-scrollbar-thumb": {
            borderRadius: 10,
            border: `3px solid ${menuHighlightColor}`
        }
    }),
    option: (base, state) => {
        const shouldColor =
            (state.isSelected || state.isFocused) && !state.isDisabled;
        const style = {
            border: shouldColor ? "none" : `1px solid ${menuHighlightColor}`,
            borderRadius: 10,
            cursor: "pointer",
            padding: shouldColor ? "9px 13px" : "8px 12px",
            margin: 5,
            backgroundColor: shouldColor
                ? menuHighlightColor
                : menuBackgroundColor,
            color: shouldColor ? "white" : "black",
            fontSize: ".95em"
            // maxHeight: '10vh',
        };

        if (state.isDisabled) {
            return {
                ...style,
                cursor: "default",
                color: "#444444",
                fontWeight: 600,
                fontSize: ".85em"
            };
        }
        return style;
    }
};

export default customStyles;
