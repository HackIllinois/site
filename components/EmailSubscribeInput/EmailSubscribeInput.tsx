"use client";

import React, { useState } from "react";
import validator from "validator";
import toast, { Toaster } from "react-hot-toast";
import styles from "./EmailSubscribeInput.module.scss";
import { subscribe } from "@/util/api";

export function EmailSubscribeInput() {
    const [email, setEmail] = useState("");

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleSubscription = async () => {
        if (!validator.isEmail(email)) {
            toast.error("Please enter a valid email address!");
            return;
        }

        try {
            console.log("sending request");
            await subscribe("hackillinois2026_interest", email);
            setEmail(""); // clear input field after submitting
            console.log("request complete");
            toast.success(
                "Thanks for subscribing! You’ll hear from us shortly.",
                { duration: 3000 }
            );
        } catch (err) {
            console.error(err);
            toast.error("Oops! Something went wrong. Please try again.");
        }
    };

    const handleKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSubscription();
        }
    };

    return (
        <div>
            <p className={styles.label}>HackIllinois Newsletter</p>
            <div className={styles.container}>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className={styles.input}
                    value={email}
                    onChange={handleEmailChange}
                    onKeyDown={handleKeydown}
                />
                <button
                    type="button"
                    className={styles.button}
                    onClick={handleSubscription}
                >
                    Subscribe
                </button>

                {/* Toast container */}
                <Toaster
                    position="top-right"
                    toastOptions={{
                        style: {
                            background: "#fff8e0",
                            color: "#d97706",
                            borderRadius: "0.75rem",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                        },
                        success: { duration: 3000 },
                        error: { duration: 4000 }
                    }}
                />
            </div>
        </div>
    );
}
