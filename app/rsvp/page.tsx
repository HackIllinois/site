"use client";

import TextInput from "@/components/TextInputMUI";
import { Box } from "@mui/material";
import {
    profileInitialValues,
    profileValidationSchema
} from "@/util/validation";
import { useFormik } from "formik";
import RadioSelectGroup from "@/components/RadioSelectGroupMUI";
import CheckboxGroup from "@/components/CheckboxGroupMUI";
import { dietaryRestrictionsOptions } from "@/util/options";

const tabletFormInputSx = {
    text: {
        // override normal styling
        backgroundColor: "#00ff0015",
        border: "2px solid #04ff00",
        boxShadow: "inset 0 0 16px 0px #04ff00",
        "&.Mui-focused": {
            // Mui props needed because of the MUI component structure... the focus is on the input _inside_ this div
            backgroundColor: "#00ff0025", // lighter on focus
            boxShadow: "0 0 4px 2px #ffffff40, inset 0 0 16px 0px #04ff00" // subtle glow
        }
    },
    select: {
        // override normal styling
        backgroundColor: "#00ff0015",
        border: "2px solid #04ff00",
        boxShadow: "inset 0 0 16px 0px #04ff00",
        "&:hover": {
            backgroundColor: "#00ff0025", // lighter on hover
            boxShadow: "0 0 4px 2px #ffffff40, inset 0 0 16px 0px #04ff00" // subtle glow
        },
        "&.Mui-checked": {
            color: "transparent", // this affects the animation
            background: "transparent"
        },
        "&.Mui-checked:hover": {
            background: "transparent",
            boxShadow: "0 0 4px 2px #ffffff40, inset 0 0 16px 0px #04ff00" // subtle glow
        }
    }
};

const Rsvp = () => {
    // get initial values from profile endpoint, if they exist

    const formik = useFormik({
        initialValues: profileInitialValues,
        validationSchema: profileValidationSchema,
        onSubmit: values => {
            console.log(values);
        }
    });
    const { values, errors, touched, handleChange, setFieldValue } = formik;

    return (
        <Box
            sx={{
                minHeight: "100vh",
                width: "100vw",
                height: "fit-content",
                background: `url("/profile/background.jpg") center / cover no-repeat`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                py: { xs: 0, sm: 12 }
            }}
        >
            <Box
                sx={{
                    maxWidth: "90vw",
                    width: "80vw",
                    height: "fit-content",
                    // tablet coloring
                    border: { xs: "none", sm: "2px solid #00FF2B" },
                    background: {
                        xs: "linear-gradient(0deg, rgba(0, 204, 3, .4) 0%, rgba(0, 229, 4, 0.40) 1.86%, rgba(0, 255, 4, 0.30) 3.73%, rgba(0, 153, 3, 0.15) 33.17%, rgba(0, 153, 3, 0.15) 70.67%, rgba(0, 255, 4, 0.30) 95.54%, rgba(0, 229, 4, 0.40) 99.12%)",
                        sm: "linear-gradient(0deg, rgba(0, 204, 3, .01) 0%, rgba(0, 229, 4, 0.40) 1.86%, rgba(0, 255, 4, 0.30) 3.73%, rgba(0, 153, 3, 0.15) 33.17%, rgba(0, 153, 3, 0.15) 70.67%, rgba(0, 255, 4, 0.30) 95.54%, rgba(0, 229, 4, 0.40) 99.12%)"
                    },
                    backdropFilter: "blur(7.5px)",
                    overflow: "hidden",
                    py: 8,
                    px: 4,
                    display: "flex",
                    flexDirection: "column",
                    gap: 6
                }}
            >
                {/* tablet panel */}
                <TextInput
                    name="displayName"
                    label="Display Name"
                    accentColor="#f0f0f0"
                    sublabel="(This will be shown to other hackers, on the leaderboard, and in our mobile apps)"
                    inputSx={tabletFormInputSx.text}
                    required
                    value={values.displayName}
                    onChange={handleChange}
                    error={!!touched.displayName && Boolean(errors.displayName)}
                    helperText={!!touched.displayName ? errors.displayName : ""}
                    inputProps={{ maxLength: 200 }}
                />
                <TextInput
                    name="discordTag"
                    label="Discord Tag"
                    accentColor="#f0f0f0"
                    inputSx={tabletFormInputSx.text}
                    required
                    value={values.discordTag}
                    onChange={handleChange}
                    error={!!touched.discordTag && Boolean(errors.discordTag)}
                    helperText={!!touched.discordTag ? errors.discordTag : ""}
                    inputProps={{ maxLength: 200 }}
                />
                <TextInput
                    name="resume"
                    label="Resume"
                    accentColor="#f0f0f0"
                    inputSx={tabletFormInputSx.text}
                    multiline
                    required
                    minRows={4}
                    value={values.resume}
                    onChange={handleChange}
                    error={!!touched.resume && Boolean(errors.resume)}
                    helperText={!!touched.resume ? errors.resume : ""}
                    inputProps={{ maxLength: 200 }}
                />
                <RadioSelectGroup
                    name="shirtSize"
                    label="Shirt Size"
                    accentColor="#f0f0f0"
                    inputSx={tabletFormInputSx.select}
                    row
                    required
                    options={["XS", "S", "M", "L", "XL", "2XL"].map(option => ({
                        label: option,
                        value: option
                    }))}
                    value={values.shirtSize}
                    onChange={value => setFieldValue("shirtSize", value)}
                    error={!!touched.shirtSize && Boolean(errors.shirtSize)}
                    helperText={!!touched.shirtSize ? errors.shirtSize : ""}
                    booleanOptions
                />
                <CheckboxGroup
                    name="dietaryRestrictions"
                    label="How did you hear about HackIllinois?"
                    accentColor={"#f0f0f0"}
                    inputSx={tabletFormInputSx.select}
                    options={dietaryRestrictionsOptions.map(option => ({
                        label: option,
                        value: option
                    }))}
                    value={Array.from(values.dietaryRestrictions) || []}
                    onChange={value =>
                        setFieldValue("dietaryRestrictions", value)
                    }
                    error={
                        !!touched.dietaryRestrictions &&
                        Boolean(errors.dietaryRestrictions)
                    }
                    helperText={
                        !!touched.dietaryRestrictions
                            ? String(errors.dietaryRestrictions || "")
                            : ""
                    }
                />
            </Box>
        </Box>
    );
};

export default Rsvp;
