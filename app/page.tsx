import React from "react";
import styles from "./page.module.scss";
// import Olympian from "@/components/Home/Olympian/Olympian";
// import Footer from "@/components/Home/Footer/Footer";
// import FAQJoinUs from "@/components/Home/FAQJoinUs/FAQJoinUs";
// import Sponsors from "@/components/Home/Sponsors/Sponsors";
// import FAQSection from "@/components/Home/FAQ/FAQ";
import Accepted from "@/components/Profile/RSVP/ModalViews/Accepted";
import Rejected from "@/components/Profile/RSVP/ModalViews/Rejected";
import ConfirmReject from "@/components/Profile/RSVP/ModalViews/ConfirmReject";

const Home: React.FC = () => {
    return (
        <main className={styles.main}>
            <ConfirmReject
                handleAPIDecline={() => {}}
                handleGoBack={() => {}}
            />
            <Accepted
                reimburse={120.23}
                handleConfirm={() => {}}
                handleDecline={() => {}}
            >
                <b>Congrats, stuff is happening</b>
            </Accepted>
            <Rejected handleCancel={() => {}} />
            {/* <Olympian />
            <FAQJoinUs />
            <FAQSection />
            <Sponsors />
            <Footer /> */}
        </main>
    );
};

export default Home;
