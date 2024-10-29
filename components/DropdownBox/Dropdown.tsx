"use client"
import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import DropdownItem from './DropdownItem'
import './Dropdown.scss'

interface DropdownProps {
    name: string
    label: string
    options: string[]
    placeholder?: string
    width?: string
    required?: boolean
    onSubmit: (data: any) => void
}

const Dropdown: React.FC<DropdownProps> = ({ name, label, options, placeholder = "Select...", width = "20%", required = false, onSubmit }) => {
    const { setValue, register, handleSubmit } = useFormContext()
    const [isOpen, setIsOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState<string | null>(null)

    const handleToggle = (e: React.MouseEvent) => {
        e.preventDefault()
        setIsOpen(!isOpen)
    }

    const handleOptionClick = (option: string) => {
        setSelectedOption(option)
        setValue(name, option)
        setIsOpen(false)
        handleSubmit(onSubmit)()
    }

    return (
        <div className="dropdown" style={{ width }}>
            <label className="dropdown-label">{label}{required && '*'}</label>
            <div className="dropdown-container">
                <button onClick={handleToggle} className="dropdown-button">
                    {selectedOption || placeholder}
                    <span className="dropdown-icon">
                        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                    </span>
                </button>
                {isOpen && (
                    <ul className={`dropdown-options ${isOpen ? 'open' : ''}`}>
                        {options.map((option, index) => (
                            <DropdownItem
                                key={index}
                                option={option}
                                onClick={handleOptionClick}
                            />
                        ))}
                    </ul>
                )}
            </div>
            <input
                type="hidden"
                {...register(name, { required })}
                value={selectedOption || ""}
                onChange={() => {}}
            />
        </div>
    )
}

export default Dropdown