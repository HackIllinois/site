import { useEffect } from "react";
import { useController, useFormContext } from "react-hook-form";

type PropTypes = {
    name: string;
    value: unknown;
};

const Constant = ({ name, value }: PropTypes): JSX.Element | null => {
    const { control } = useFormContext();
    const { field } = useController({ name, control, defaultValue: null });

    useEffect(() => {
        field.onChange(value);
    }, [field, value]);

    return null;
};

export default Constant;
