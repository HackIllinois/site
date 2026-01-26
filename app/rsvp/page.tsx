"use client";

import { SocialIconsRow } from "@/components/GradientButton/GradientSocialButton";
import Loading from "@/components/Loading/Loading";
import NewsletterSubscription from "@/components/NewsletterSubscription/NewsletterSubscription";
import { loadAdmissionRSVP, loadSubmission } from "@/util/api";
import { RSVPInfo, RegistrationApplicationSubmitted } from "@/util/types";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography
} from "@mui/material";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import clsx from "clsx";

export default function RSVP() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [rsvpData, setRsvpData] = useState<RSVPInfo | null>(null);
    const [registrationData, setRegistrationData] =
        useState<RegistrationApplicationSubmitted | null>(null);
    const [showDeclineDialog, setShowDeclineDialog] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const loadRSVPData = async () => {
        try {
            const [rsvpData, registrationData] = await Promise.all([
                loadAdmissionRSVP(),
                loadSubmission()
            ]);

            console.log(
                "rsvpData",
                rsvpData,
                "registrationData",
                registrationData
            );

            setRsvpData(rsvpData);
            setRegistrationData(registrationData);

            if (!rsvpData.emailSent) {
                router.push("/register/general");
                return;
            }

            if (rsvpData.status !== "ACCEPTED") {
                router.push("/");
            } else if (rsvpData.response === "ACCEPTED") {
                router.push("/profile");
            }
            setLoading(false);
        } catch (error: any) {
            if (
                error?.status === 404 ||
                error?.statusCode === 404 ||
                error.error === "NotFound"
            ) {
                router.push("/register/general");
            } else {
                console.error("Error loading RSVP data:", error);
                router.push("/");
            }
        }
    };
    useEffect(() => {
        loadRSVPData();
    }, [router, searchParams]);

    const handleAccept = async () => {
        if (submitting) return;
        setSubmitting(true);
        try {
            router.push("/profile");
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
            setRsvpData((prev: RSVPInfo | null) =>
                prev ? { ...prev, response: "DECLINED" } : null
            );
            setShowDeclineDialog(false);
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
                <Image
                    src="/rsvp/post_decision_screen.svg"
                    alt="Background"
                    fill
                    className={styles.backgroundImage}
                    priority
                />
                <div className={styles.navbarSpacer} />
                <div className={styles.declinedContent}>
                    <Typography className={styles.declinedHeading}>
                        {"We're sorry to see you go!"}
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
            <Image
                src="/rsvp/decision_screen.svg"
                alt="Background"
                fill
                className={clsx(styles.backgroundImage, styles.darken)}
                priority
            />
            <div className={styles.navbarSpacer} />
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
