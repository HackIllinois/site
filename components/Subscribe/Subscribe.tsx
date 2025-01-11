"use client";
import React, { useState } from "react";
import styles from "./Subscribe.module.scss";
import { subscribe } from "@/util/api";

const Subscribe = () => {
    const [email, setEmail] = useState("");

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleSubscription = async () => {
        await subscribe("hackillinois2025_interest", email);
        setEmail("");
        alert("Subscribed to our email list!");
    };

    const handleKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSubscription();
        }
    };

    return (
        <div className={styles.subscribe}>
            <input
                className={styles.input}
                type="email"
                name="email"
                placeholder="Type your email here!"
                value={email}
                onChange={handleEmailChange}
                onKeyDown={handleKeydown}
            ></input>
            <button
                className={styles.button}
                onClick={() => handleSubscription()}
            >
                Join
            </button>
        </div>
    );
};

export default Subscribe;
