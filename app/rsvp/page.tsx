"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography
} from "@mui/material";
import {
    loadAdmissionRSVP,
    acceptRSVP,
    declineRSVP,
    loadSubmission
} from "@/util/api";
import Loading from "@/components/Loading/Loading";
import NewsletterSubscription from "@/components/NewsletterSubscription/NewsletterSubscription";
import { SocialIconsRow } from "@/components/GradientButton/GradientSocialButton";
import { RSVPInfo, RegistrationApplicationSubmitted } from "@/util/types";
import styles from "./page.module.scss";

export default function RSVP() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [rsvpData, setRsvpData] = useState<RSVPInfo | null>(null);
    const [registrationData, setRegistrationData] =
        useState<RegistrationApplicationSubmitted | null>(null);
    const [showDeclineDialog, setShowDeclineDialog] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const testParam = searchParams.get("test");
    const isTestMode = testParam === "true";

    useEffect(() => {
        if (isTestMode) {
            setLoading(false);
            const scenario = searchParams.get("scenario");

            if (scenario === "pro") {
                setRsvpData({
                    userId: "test-user",
                    status: "ACCEPTED",
                    admittedPro: true,
                    response: "PENDING",
                    emailSent: false,
                    reimbursementValue: 500,
                    correctProChallenge: true
                });
                setRegistrationData({
                    userId: "test-user",
                    firstName: "Test",
                    lastName: "User",
                    age: "20",
                    email: "test@test.com",
                    gender: "Other",
                    race: ["Other"],
                    country: "USA",
                    school: "Test University",
                    education: "Undergraduate",
                    graduate: "2026",
                    major: "Computer Science",
                    underrepresented: "No",
                    hackathonsParticipated: "0",
                    application1: "Test",
                    application2: "Test",
                    application3: "Test",
                    attribution: [],
                    eventInterest: [],
                    requestTravelReimbursement: true
                });
            } else if (scenario === "general") {
                setRsvpData({
                    userId: "test-user",
                    status: "ACCEPTED",
                    admittedPro: false,
                    response: "PENDING",
                    emailSent: false,
                    reimbursementValue: 200,
                    correctProChallenge: false
                });
                setRegistrationData({
                    userId: "test-user",
                    firstName: "Test",
                    lastName: "User",
                    age: "20",
                    email: "test@test.com",
                    gender: "Other",
                    race: ["Other"],
                    country: "USA",
                    school: "Test University",
                    education: "Undergraduate",
                    graduate: "2026",
                    major: "Computer Science",
                    underrepresented: "No",
                    hackathonsParticipated: "0",
                    application1: "Test",
                    application2: "Test",
                    application3: "Test",
                    attribution: [],
                    eventInterest: [],
                    requestTravelReimbursement: true
                });
            } else if (scenario === "declined") {
                setRsvpData({
                    userId: "test-user",
                    status: "ACCEPTED",
                    admittedPro: true,
                    response: "DECLINED",
                    emailSent: false,
                    reimbursementValue: 500,
                    correctProChallenge: true
                });
                setRegistrationData({
                    userId: "test-user",
                    firstName: "Test",
                    lastName: "User",
                    age: "20",
                    email: "test@test.com",
                    gender: "Other",
                    race: ["Other"],
                    country: "USA",
                    school: "Test University",
                    education: "Undergraduate",
                    graduate: "2026",
                    major: "Computer Science",
                    underrepresented: "No",
                    hackathonsParticipated: "0",
                    application1: "Test",
                    application2: "Test",
                    application3: "Test",
                    attribution: [],
                    eventInterest: [],
                    requestTravelReimbursement: true
                });
            } else if (scenario === "general-from-pro") {
                setRsvpData({
                    userId: "test-user",
                    status: "ACCEPTED",
                    admittedPro: false,
                    response: "PENDING",
                    emailSent: false,
                    reimbursementValue: 200,
                    correctProChallenge: true
                });
                setRegistrationData({
                    userId: "test-user",
                    firstName: "Test",
                    lastName: "User",
                    age: "20",
                    email: "test@test.com",
                    gender: "Other",
                    race: ["Other"],
                    country: "USA",
                    school: "Test University",
                    education: "Undergraduate",
                    graduate: "2026",
                    major: "Computer Science",
                    underrepresented: "No",
                    hackathonsParticipated: "0",
                    application1: "Test",
                    application2: "Test",
                    application3: "Test",
                    attribution: [],
                    eventInterest: [],
                    requestTravelReimbursement: true
                });
            } else if (scenario === "no-reimbursement") {
                setRsvpData({
                    userId: "test-user",
                    status: "ACCEPTED",
                    admittedPro: true,
                    response: "PENDING",
                    emailSent: false,
                    reimbursementValue: 0,
                    correctProChallenge: true
                });
                setRegistrationData({
                    userId: "test-user",
                    firstName: "Test",
                    lastName: "User",
                    age: "20",
                    email: "test@test.com",
                    gender: "Other",
                    race: ["Other"],
                    country: "USA",
                    school: "Test University",
                    education: "Undergraduate",
                    graduate: "2026",
                    major: "Computer Science",
                    underrepresented: "No",
                    hackathonsParticipated: "0",
                    application1: "Test",
                    application2: "Test",
                    application3: "Test",
                    attribution: [],
                    eventInterest: [],
                    requestTravelReimbursement: false
                });
            } else {
                setRsvpData({
                    userId: "test-user",
                    status: "ACCEPTED",
                    admittedPro: true,
                    response: "PENDING",
                    emailSent: false,
                    reimbursementValue: 500,
                    correctProChallenge: true
                });
                setRegistrationData({
                    userId: "test-user",
                    firstName: "Test",
                    lastName: "User",
                    age: "20",
                    email: "test@test.com",
                    gender: "Other",
                    race: ["Other"],
                    country: "USA",
                    school: "Test University",
                    education: "Undergraduate",
                    graduate: "2026",
                    major: "Computer Science",
                    underrepresented: "No",
                    hackathonsParticipated: "0",
                    application1: "Test",
                    application2: "Test",
                    application3: "Test",
                    attribution: [],
                    eventInterest: [],
                    requestTravelReimbursement: true
                });
            }
            return;
        }

        const loadRSVPData = async () => {
            try {
                const [rsvpData, registrationData] = await Promise.all([
                    loadAdmissionRSVP(),
                    loadSubmission()
                ]);
                setRsvpData(rsvpData);
                setRegistrationData(registrationData);

                if (rsvpData.status !== "ACCEPTED") {
                    router.push("/");
                } else if (rsvpData.response === "ACCEPTED") {
                    router.push("/profile");
                }
            } catch (error: any) {
                if (error?.status === 404 || error?.statusCode === 404) {
                    router.push("/register/general");
                } else {
                    console.error("Error loading RSVP data:", error);
                    router.push("/");
                }
            } finally {
                setLoading(false);
            }
        };

        loadRSVPData();
    }, [router, searchParams, isTestMode]);

    const handleAccept = async () => {
        if (submitting) return;
        setSubmitting(true);
        try {
            if (isTestMode) {
                router.push("/profile");
            } else {
                await acceptRSVP();
                router.push("/profile");
            }
        } catch (error) {
            console.error("Error accepting RSVP:", error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeclineClick = () => {
        setShowDeclineDialog(true);
    };

    const handleDeclineConfirm = async () => {
        if (submitting) return;
        setSubmitting(true);
        try {
            if (isTestMode) {
                setRsvpData((prev: RSVPInfo | null) =>
                    prev ? { ...prev, response: "DECLINED" } : null
                );
                setShowDeclineDialog(false);
            } else {
                await declineRSVP();
                setRsvpData((prev: RSVPInfo | null) =>
                    prev ? { ...prev, response: "DECLINED" } : null
                );
                setShowDeclineDialog(false);
            }
        } catch (error) {
            console.error("Error declining RSVP:", error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeclineCancel = () => {
        setShowDeclineDialog(false);
    };

    if (loading) return <Loading />;

    if (rsvpData?.response === "DECLINED") {
        return (
            <main className={styles.main}>
                {isTestMode && (
                    <div className={styles.testModeBanner}>
                        TEST MODE - Scenario:{" "}
                        {searchParams.get("scenario") === "no-reimbursement"
                            ? "Pro (No Reimbursement)"
                            : searchParams.get("scenario") ===
                                "general-from-pro"
                              ? "General Attendee (Applied Pro)"
                              : searchParams.get("scenario") === "general"
                                ? "General Attendee (Applied General)"
                                : rsvpData?.admittedPro
                                  ? "Pro (HackVoyager)"
                                  : "General Attendee"}{" "}
                        (Declined)
                    </div>
                )}
                <Image
                    src="/rsvp/postDecisionDeclined.svg"
                    alt="Background"
                    fill
                    className={styles.backgroundImage}
                    priority
                />
                <div
                    className={`${styles.navbarSpacer} ${isTestMode ? styles.testModeSpacer : ""}`}
                />
                <div className={styles.declinedContent}>
                    <Typography className={styles.declinedHeading}>
                        We're sorry to see you go!
                    </Typography>
                    <Typography className={styles.declinedText}>
                        If you would like to stay up to date with HackIllinois,
                        consider following our socials or subscribing to our
                        newsletter.
                    </Typography>
                    <SocialIconsRow />
                    <div className={styles.newsletterSection}>
                        <Typography className={styles.newsletterHeading}>
                            Newsletter signup
                        </Typography>
                        <NewsletterSubscription />
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className={styles.main}>
            {isTestMode && (
                <div className={styles.testModeBanner}>
                    TEST MODE - Scenario:{" "}
                    {searchParams.get("scenario") === "no-reimbursement"
                        ? "Pro (No Reimbursement)"
                        : searchParams.get("scenario") === "general-from-pro"
                          ? "General Attendee (Applied Pro)"
                          : searchParams.get("scenario") === "general"
                            ? "General Attendee (Applied General)"
                            : rsvpData?.admittedPro
                              ? "Pro (HackVoyager)"
                              : "General Attendee"}
                </div>
            )}
            <Image
                src="/rsvp/decision screen v1.svg"
                alt="Background"
                fill
                className={styles.backgroundImage}
                priority
            />
            <div
                className={`${styles.navbarSpacer} ${isTestMode ? styles.testModeSpacer : ""}`}
            />
            <div className={styles.content}>
                <Typography className={styles.congratsHeading}>
                    CONGRATULATIONS!
                </Typography>
                <Typography
                    className={
                        rsvpData?.admittedPro
                            ? styles.acceptedText
                            : styles.acceptedTextGeneral
                    }
                >
                    {rsvpData?.admittedPro
                        ? "You've been accepted as a"
                        : rsvpData?.correctProChallenge
                          ? "While we unfortunately couldn't offer you a spot as a HackVoyager, you've been accepted as a"
                          : "You've been accepted as a"}
                </Typography>
                {rsvpData?.admittedPro ? (
                    <Image
                        src="/rsvp/hackVoyager.svg"
                        alt="Hack Voyager"
                        width={400}
                        height={400}
                        className={styles.hackVoyagerLogo}
                        priority
                    />
                ) : (
                    <Image
                        src="/rsvp/generalAttendee.svg"
                        alt="General Attendee"
                        width={400}
                        height={400}
                        className={styles.hackVoyagerLogo}
                        priority
                    />
                )}
                {registrationData?.requestTravelReimbursement && (
                    <Typography className={styles.reimbursementText}>
                        with a reimbursement total of{" "}
                        <span className={styles.reimbursementAmount}>
                            ${rsvpData?.reimbursementValue || 200}
                        </span>
                    </Typography>
                )}
                <Typography className={styles.description}>
                    If you would like to attend HackIllinois 2026, click Next to
                    finish RSVP process. If you won&apos;t be attending, please
                    click Decline.{" "}
                    <span className={styles.bold}>This cannot be reversed</span>
                </Typography>
                <div className={styles.buttonContainer}>
                    <button
                        className={styles.confirmButton}
                        onClick={handleAccept}
                        disabled={submitting}
                    >
                        CONFIRM
                    </button>
                    <button
                        className={styles.declineButton}
                        onClick={handleDeclineClick}
                        disabled={submitting}
                    >
                        DECLINE
                    </button>
                </div>
            </div>
            <Dialog
                open={showDeclineDialog}
                onClose={handleDeclineCancel}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    className: styles.dialogPaper
                }}
            >
                <DialogTitle className={styles.dialogTitle}>
                    Are you sure you want to decline?
                </DialogTitle>
                <DialogContent>
                    <Typography className={styles.dialogText}>
                        This action cannot be reversed. If you decline, you will
                        not be able to attend HackIllinois 2026.
                    </Typography>
                </DialogContent>
                <DialogActions className={styles.dialogActions}>
                    <button
                        className={styles.cancelButton}
                        onClick={handleDeclineCancel}
                    >
                        CANCEL
                    </button>
                    <button
                        className={styles.confirmDeclineButton}
                        onClick={handleDeclineConfirm}
                        disabled={submitting}
                    >
                        YES, DECLINE
                    </button>
                </DialogActions>
            </Dialog>
        </main>
    );
}
