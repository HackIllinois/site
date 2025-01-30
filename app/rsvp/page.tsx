"use client";
import AvatarSelector from "@/components/AvatarSelector/AvatarSelector";
import styles from "./styles.module.scss";
import { Formik } from "formik";

const RSVPTestingPage: React.FC = () => {
    return (
        <div className={styles.screen}>
            <h1>RSVP Testing Page</h1>
            <p>This page will be removed shortly.</p>
            <br />
            <Formik
                initialValues={{
                    avatar: null
                }}
                onSubmit={() => {}}
            >
                <AvatarSelector name="avatar" label="Select your avatar:" />
            </Formik>
        </div>
    );
};

export default RSVPTestingPage;
