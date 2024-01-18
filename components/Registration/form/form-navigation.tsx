import React from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";

type Props = {
    setFormIndex: React.Dispatch<React.SetStateAction<number>>;
    formIndex: number;
};

const FormNavigation = ({ setFormIndex, formIndex }: Props): JSX.Element => {
    const nextPage = () => setFormIndex(current => current + 1);
    const veryNextPage = () => setFormIndex(current => current + 2);
    const prevPage = () => setFormIndex(current => current - 1);
    const veryPrevPage = () => setFormIndex(current => current - 2);

    return (
        <div>
            {formIndex === 0 || formIndex === 7 ? (
                <div className={styles.formProgress}>
                    <div className={styles.activeDot}></div>
                    <div className={styles.pageDot} onClick={nextPage}></div>
                    <div
                        className={styles.pageDot}
                        onClick={veryNextPage}
                    ></div>
                </div>
            ) : formIndex === 1 || formIndex === 8 ? (
                <div className={styles.formProgress}>
                    <div className={styles.activeDot} onClick={prevPage}></div>
                    <div className={styles.activeDot}></div>
                    <div className={styles.pageDot} onClick={nextPage}></div>
                </div>
            ) : formIndex === 2 || formIndex === 9 ? (
                <div className={styles.formProgress}>
                    <div
                        className={styles.activeDot}
                        onClick={veryPrevPage}
                    ></div>
                    <div className={styles.activeDot} onClick={prevPage}></div>
                    <div className={styles.activeDot}></div>
                </div>
            ) : formIndex === 3 || formIndex === 5 ? (
                <div className={styles.formProgress}>
                    <div className={styles.activeDot}></div>
                    <div className={styles.pageDot} onClick={nextPage}></div>
                </div>
            ) : formIndex === 4 || formIndex === 6 ? (
                <div className={styles.formProgress}>
                    <div className={styles.activeDot} onClick={prevPage}></div>
                    <div className={styles.activeDot}></div>
                </div>
            ) : (
                <div className={styles.formProgress}></div>
            )}
        </div>
    );
};

export default FormNavigation;
