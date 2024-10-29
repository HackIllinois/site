import Form from "@/components/Registration/Form/Form";
import Head from "next/head";

import styles from "./styles.module.scss";

const Registration: React.FC = () => {
    return (
        <>
            <Head>
                <title>HackIllinois | Register</title>
            </Head>
            <main className={styles.container}>
                <Form />
            </main>
        </>
    );
};

export default Registration;
