"use client"
import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import Dropdown from './Dropdown'

interface DropdownWrapperProps {
    options: string[]
    name: string;     
}

const MainDropdown: React.FC<DropdownWrapperProps> = ({ options, name }) => {
    const methods = useForm()

    const onSubmit = (data: any) => {
        console.log(data)
    }

    const dropdownLabel = name ? name.charAt(0).toUpperCase() + name.slice(1) : 'Dropdown';

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <Dropdown name={name} label={dropdownLabel} options={options} required onSubmit={onSubmit} />
            </form>
        </FormProvider>
    )
}

export default MainDropdown