"use client";
import { avatars } from "@/modules/avatars";
import clsx from "clsx";
import { useField } from "formik";
import Image from "next/image";
import styles from "./AvatarSelector.module.scss";

export type AvatarSelectorProps = {
    name: string;
    label: string;
    required?: boolean;
};

const AvatarSelector: React.FC<AvatarSelectorProps> = ({
    name,
    label,
    required
}) => {
    const [field, meta, helpers] = useField(name);
    const { setValue } = helpers;
    const { value } = field;

    return (
        <div className={styles.container}>
            <label htmlFor={name}>
                {label}
                {required && "*"}
            </label>
            <div className={styles.avatarSelector}>
                {avatars.map(avatar => (
                    <div
                        style={{
                            backgroundColor:
                                avatar.backgroundColor ?? "transparent"
                        }}
                        className={clsx(
                            styles.avatarIcon,
                            avatar.name === value && styles.selected
                        )}
                        key={avatar.name}
                        onClick={() => {
                            setValue(avatar.name);
                        }}
                    >
                        <Image
                            className={styles.avatarIconImage}
                            src={avatar.icon}
                            alt={avatar.name}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AvatarSelector;
