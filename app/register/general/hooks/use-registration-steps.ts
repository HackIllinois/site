import { useEffect, useState, useCallback } from "react";
import * as Yup from "yup";
import { RegistrationApplicationDraftBody } from "@/util/types";
import { page_slugs, steps } from "../constants/registration";

const slugToIndex = (slug?: string) => {
    const i = page_slugs.indexOf((slug as any) ?? "");
    return i >= 0 ? i : 0;
};
const indexToSlug = (i: number) =>
    page_slugs[Math.max(0, Math.min(i, page_slugs.length - 1))];

export function useRegistrationSteps(
    validationSchemas: Yup.ObjectSchema<any, any, any, any>[],
    submitted: boolean
) {
    const [currentStep, setCurrentStep] = useState(0);

    // step -> hash
    useEffect(() => {
        let slug = indexToSlug(currentStep);
        // if (submitted) {
        //     // The user should be at the confirmation page if they submitted.
        //     slug = "confirmation";
        // } else if (slug === "confirmation") {
        //     // If the user somehow navigated to the confirmation page without submitting, send them back to the beginning.
        //     slug = indexToSlug(0);
        // }
        if (window.location.hash === `#${slug}`) return;
        window.location.hash = slug;
    }, [currentStep, submitted]);

    // hash -> step
    useEffect(() => {
        const readHash = () => {
            const slug = window.location.hash.replace(/^#/, "");
            if (!slug) return;
            const idx = slugToIndex(slug);
            setCurrentStep(prev => (idx !== prev ? idx : prev));
        };

        readHash();

        window.addEventListener("hashchange", readHash);
        return () => window.removeEventListener("hashchange", readHash);
    }, []);

    const handleNext = useCallback(
        async (
            values: RegistrationApplicationDraftBody,
            setTouched: (t: any) => void
        ) => {
            const currentSchema = validationSchemas[currentStep];

            try {
                await currentSchema.validate(values, { abortEarly: false });
                if (currentStep < steps.length - 1) {
                    setCurrentStep(prev => prev + 1);
                    window.scrollTo(0, 0);
                }
                return true;
            } catch (error) {
                if (error instanceof Yup.ValidationError) {
                    const touchedFields: any = {};
                    error.inner.forEach(err => {
                        if (err.path) touchedFields[err.path] = true;
                    });
                    setTouched(touchedFields);
                }
                return false;
            }
        },
        [currentStep, validationSchemas]
    );

    const handleBack = useCallback(() => {
        setCurrentStep(prev => {
            const next = prev - 1;
            if (next < 0) return 0;
            window.scrollTo(0, 0);
            return next;
        });
    }, []);

    const skipToStep = useCallback((step: number) => {
        setCurrentStep(() => {
            const next = step;
            if (next < 0) return 0;
            if (next >= steps.length) return steps.length - 1;
            window.scrollTo(0, 0);
            return next;
        });
    }, []);

    const isLastStep = currentStep === steps.length - 1;

    return {
        currentStep,
        setCurrentStep,
        handleNext,
        handleBack,
        skipToStep,
        isLastStep
    };
}
