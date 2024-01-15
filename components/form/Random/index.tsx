import { useEffect } from "react";
import { useController, useFormContext } from "react-hook-form";
// import seedrandom from "seedrandom";

type WithOptionList = { options: unknown[] };
type WithFunctionGenerator = {
    min: number; // inclusive
    max: number; // exclusive
    generateValue: (num: number) => unknown;
};
type ValueChoices = WithOptionList | WithFunctionGenerator;
type PropTypes = { name: string; seed?: string } & ValueChoices;

function areOptionsSpecified(props: ValueChoices): props is WithOptionList {
    return (props as WithOptionList).options !== undefined;
}

const Random = ({ name, seed, ...props }: PropTypes): JSX.Element | null => {
    const { control } = useFormContext();
    const { field } = useController({ name, control, defaultValue: null });

    useEffect(() => {
        const random = () => {
            if (seed) {
                // const rng = seedrandom(seed);
                // return rng();
            }
            return Math.random();
        };

        if (areOptionsSpecified(props)) {
            const { options } = props;
            const index = Math.floor(random() * options.length);
            field.onChange(options[index]);
        } else {
            const { min, max, generateValue } = props;
            const num = Math.floor(random() * (max - min)) + min;
            field.onChange(generateValue(num));
        }
    }, [field, props, seed]);

    return null;
};

export default Random;
