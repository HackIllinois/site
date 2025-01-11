"use client";
import styles from "./Registration.module.scss";
import React, { createContext, useContext, useRef, useState } from "react";
import { Form, Formik, FormikProps } from "formik";
import { RegistrationData } from "@/util/types";
import { usePathname, useRouter } from "next/navigation";
import NavigationButton from "../Form/NavigationButton/NavigationButton";
import { registerSubmit, registerUpdate } from "@/util/api";
import Loading from "../Loading/Loading";
import { handleError, registrationToAPI } from "@/util/helpers";
import ProgressBar from "./ProgressBar";
import { getRegistrationSchema } from "./validation";

import ARTEMIS from "@/public/registration/characters/artemis.svg";
import APOLLO from "@/public/registration/characters/apollo.svg";
import Image from "next/image";

const characters = [ARTEMIS, APOLLO];

const pages = [
    "/register/personal-info",
    "/register/education",
    "/register/hack-specific",
    "/register/transportation",
    "/register/review"
];
const pageMap = {
    "/register/personal-info": 0,
    "/register/education": 1,
    "/register/hack-specific": 2,
    "/register/transportation": 3,
    "/register/review": 4
};
const buttonNames = {
    "/register/personal-info": ["Back", "Education"],
    "/register/education": ["Personal Info", "Hack-Specific"],
    "/register/hack-specific": ["Education", "Transportation"],
    "/register/transportation": ["Hack-Specific", "Review Info"],
    "/register/review": ["Transportation", "Submit"]
};

type LayoutContextType = {
    isPro: boolean;
    previous: (index?: number) => void;
};

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const useLayoutContext = () => {
    const context = useContext(LayoutContext);
    if (!context) {
        throw new Error(
            "useLayoutContext must be used within a LayoutProvider"
        );
    }
    return context;
};

const LayoutProvider: React.FC<
    LayoutContextType & { children: React.ReactNode }
> = ({ children, ...props }) => {
    return (
        <LayoutContext.Provider value={{ ...props }}>
            {children}
        </LayoutContext.Provider>
    );
};

type PropTypes = {
    registration: RegistrationData;
    children: React.ReactNode;
};

const Registration: React.FC<PropTypes> = ({ registration, children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const formikRef = useRef<FormikProps<RegistrationData>>(null);
    const pathname = usePathname() as keyof typeof buttonNames;
    const router = useRouter();
    const pageIndex = pageMap[pathname];
    const isPro = registration.isProApplicant;

    const previous = (index?: number) => {
        if (formikRef.current) {
            registration = {
                ...registration,
                ...formikRef.current.values
            };
        }
        router.push(
            pageIndex === 0 ? "/register" : pages[index ?? pageIndex - 1]
        );
    };

    const handleSubmit = async (values: RegistrationData) => {
        if (pathname === "/register/review") {
            setIsLoading(true);
            await registerSubmit(registrationToAPI(registration)).catch(err =>
                handleError(err)
            );
            router.push("/register/confirmation");
            return;
        }

        registration = {
            ...registration,
            ...values
        };
        setIsLoading(true);
        await registerUpdate(registrationToAPI(registration)).catch(err =>
            handleError(err)
        );
        router.push(pages[pageIndex + 1]);
        setIsLoading(false);
    };

    return (
        <>
            {isLoading && <Loading />}
            <ProgressBar previous={previous} />
            <div className={styles.scrollWrapper}>
                <div className={styles.formWrapper}>
                    <div className={styles.formContent}>
                        <Formik
                            innerRef={formikRef}
                            initialValues={registration}
                            onSubmit={handleSubmit}
                            validationSchema={getRegistrationSchema(
                                pageIndex,
                                isPro
                            )}
                            enableReinitialize
                        >
                            <Form className={styles.form}>
                                <LayoutProvider
                                    isPro={isPro}
                                    previous={previous}
                                >
                                    {children}
                                </LayoutProvider>
                                <div className={styles.navigation}>
                                    <NavigationButton
                                        text={buttonNames[pathname][0]}
                                        onClick={() => {
                                            previous();
                                        }}
                                        type="button"
                                    />
                                    <NavigationButton
                                        text={buttonNames[pathname][1]}
                                        pointRight
                                        type="submit"
                                    />
                                </div>
                            </Form>
                        </Formik>
                    </div>
                    {characters[pageIndex] && (
                        <div className={styles.character}>
                            <Image
                                src={characters[pageIndex].src}
                                alt="Character"
                                width={400}
                                height={1000}
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Registration;
