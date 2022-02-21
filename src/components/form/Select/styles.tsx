import { Styles } from 'react-select';

const menuBackgroundColor = '#ADD8CD';
const menuHighlightColor = '#2C9C98';

const customStyles: Styles<Record<string, unknown>, true | false> = {
  control: () => ({
    background: 'transparent',
    borderBottom: '1px solid #B8B8B8',
    display: 'flex',
    paddingBottom: 5,
  }),
  valueContainer: (base) => ({
    ...base,
    paddingLeft: 0,
    overflow: 'visible',
  }),
  placeholder: (base) => ({
    ...base,
    color: '#525051',
    fontWeight: 500,
    bottom: 0,
    top: 'unset',
    transform: 'none',
    fontSize: '1.125em',
  }),
  input: (base) => ({
    ...base,
    fontWeight: 500,
    fontFamily: 'Montserrat',
    width: '100%',
    '& > div, & > div > input': {
      fontWeight: 'inherit',
      fontFamily: 'inherit',
      width: '100% !important',
    },
  }),
  singleValue: (base) => ({
    ...base,
    color: 'black',
    fontWeight: 500,
    fontSize: '1.25em',
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: '#3C519C',
    borderRadius: 100,
    padding: '0 2px',
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: 'white',
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: 'white',
    cursor: 'pointer',
    '&:hover': {
      color: 'white',
      backgroundColor: 'transparent',
    },
  }),
  clearIndicator: () => ({
    color: '#3C519C',
    cursor: 'pointer',
  }),
  indicatorSeparator: () => ({
    // visible: false,
    display: 'none',
  }),
  dropdownIndicator: () => ({
    color: '#3C519C',
    cursor: 'pointer',
  }),
  menuPortal: (base) => ({
    ...base,
    zIndex: 100,
  }),
  menu: (base) => ({
    ...base,
    background: menuBackgroundColor,
    borderRadius: 20,
    padding: '0 15px',
  }),
  menuList: (base) => ({
    ...base,
    padding: '16px 0',
    scrollbarColor: `${menuHighlightColor} transparent`,
    scrollbarWidth: 'thin',
    '&::-webkit-scrollbar': {
      WebkitAppearance: 'none',
    },
    '&::-webkit-scrollbar:vertical': {
      width: 5,
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: 10,
      border: `3px solid ${menuHighlightColor}`,
    },
  }),
  option: (base, state) => {
    const shouldColor = (state.isSelected || state.isFocused) && !state.isDisabled;
    const style = {
      border: shouldColor ? 'none' : `1px solid ${menuHighlightColor}`,
      borderRadius: 10,
      cursor: 'pointer',
      padding: shouldColor ? '9px 13px' : '8px 12px',
      margin: 5,
      backgroundColor: shouldColor ? menuHighlightColor : menuBackgroundColor,
      color: shouldColor ? 'white' : 'black',
      fontSize: '.95em',
    };

    if (state.isDisabled) {
      return {
        ...style,
        cursor: 'default',
        color: '#444444',
        fontWeight: 600,
        fontSize: '.85em',
      };
    }
    return style;
  },
};

export default customStyles;
