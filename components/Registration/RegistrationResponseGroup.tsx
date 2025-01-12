import { RegistrationData, RegistrationResponseFieldInfo } from "@/util/types";
import styles from "./RegistrationResponseGroup.module.scss";
import { useMemo } from "react";

const RegistrationResponseGroup: React.FC<{
    fieldInfo: RegistrationResponseFieldInfo[];
    registration?: RegistrationData;
}> = ({ fieldInfo, registration }) => {
    const displayedFields = useMemo(() => {
        if (registration?.isProApplicant) {
            return fieldInfo;
        }
        return fieldInfo.filter(field => !field.proOnly);
    }, [registration?.isProApplicant]);

    return (
        <div className={styles.responses}>
            {displayedFields.map((field, key) => {
                let responseValue =
                    registration &&
                    registration[field.key as keyof RegistrationData];
                let responseProvided = false;
                let displayedEmptyMessage =
                    field.customEmptyMessage ?? "No response";
                if (field.options) {
                    displayedEmptyMessage = "None selected";
                }
                if (
                    field.options &&
                    responseValue &&
                    Array.isArray(responseValue)
                ) {
                    if (responseValue.length === 0) {
                        responseProvided = false;
                    } else {
                        responseProvided = true;
                    }
                    const fieldOptionsHaveLabels = field.options.every(
                        (option: any) => option.label
                    );
                    if (fieldOptionsHaveLabels) {
                        const fieldOptions = field.options as {
                            value: string;
                            label: string;
                        }[];
                        responseValue = responseValue
                            .map(value => {
                                const option = fieldOptions.find(
                                    option => option.value === value
                                );
                                return option?.label ?? value;
                            })
                            .join(", ");
                    }
                } else if (responseValue) {
                    responseProvided = true;
                }

                return (
                    <div className={styles.response} key={`review-${key}`}>
                        <p className={styles.header}>{field.text}</p>
                        <p>
                            {responseProvided
                                ? responseValue
                                : displayedEmptyMessage}
                        </p>
                    </div>
                );
            })}
        </div>
    );
};

export default RegistrationResponseGroup;
