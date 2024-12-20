import React from "react";
import { useField } from "formik";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './Dropdown.module.scss';

interface DropdownProps {
  name: string;
  label: string;
  options: string[];
  placeholder?: string;
  required?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  name,
  label,
  options,
  placeholder = "Select...",
  required = false,
}) => {
  const [field, meta, helpers] = useField(name);
  const { setValue } = helpers;
  const { value } = field;

  const showFeedback = meta.error && meta.touched;

  const modOptions = required ? options : [placeholder, ...options];

  const handleOptionClick = (option: string) => {
    setValue(option); 
  };

  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
        {required && <span className="text-danger">*</span>}
      </label>

      <div className="dropdown">
        <button
          className={`btn btn-outline-secondary dropdown-toggle ${
            showFeedback ? "is-invalid" : ""
          }`}
          type="button"
          id={`${name}-dropdown`}
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {value || placeholder}
        </button>

        <ul
          className="dropdown-menu"
          aria-labelledby={`${name}-dropdown`}
          role="menu"
        >
          {modOptions.map((option, index) => (
            <li key={index}>
              <button
                className="dropdown-item"
                type="button"
                onClick={() => handleOptionClick(option)}
                role="menuitem"
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {showFeedback && <div className="invalid-feedback">{meta.error}</div>}
    </div>
  );
};

export default Dropdown;
