"use client"
import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import Dropdown from './Dropdown'

interface DropdownWrapperProps {
    options: string[]
    name: string;   
    width: string;  
}

const MainDropdown: React.FC<DropdownWrapperProps> = ({ options, name, width }) => {
    const methods = useForm()

    const dropdownLabel = name ? name.charAt(0).toUpperCase() + name.slice(1) : 'Dropdown';

    return (
        <FormProvider {...methods}>
            <form>
                <Dropdown name={name} options={options} width={width} required />
            </form>
        </FormProvider>
    )
}

export default MainDropdown
