"use client";
import React, { useState } from "react";
import { subscribe } from "@/utils/api";
const validator = require("validator");
import styles from "./Subscribe.module.scss";

const Subscribe = () => {
    const [email, setEmail] = useState("");

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleSubscription = async () => {
        if (!validator.isEmail(email)) {
            alert("Please enter a valid email address!");
        } else {
            console.log("sending request");
            const result = subscribe("recruitment_interest", email);
            setEmail(""); // clear input field after submitting
            console.log("request complete");
            alert("Subscribed to our email list!")
        }
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
                placeholder="Email address"
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