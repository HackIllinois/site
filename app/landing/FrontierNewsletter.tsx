"use client";

import { FormEvent, useState } from "react";
import { subscribe } from "@/util/api";
import styles from "../page.module.scss";

export default function FrontierNewsletter() {
    const [sending, setSending] = useState(false);
    const [status, setStatus] = useState("");
    async function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (sending) return;
        const form = event.currentTarget;
        const email = String(new FormData(form).get("email") ?? "").trim();
        setSending(true);
        setStatus("");
        try {
            await subscribe("hackillinois2026_interest", email);
            form.reset();
            setStatus("You’re on the list!");
        } catch {
            setStatus("We couldn’t subscribe you. Please try again.");
        } finally {
            setSending(false);
        }
    }
    return (
        <form className={styles.newsletter} onSubmit={submit}>
            <label htmlFor="frontier-email">Get event updates</label>
            <input
                id="frontier-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Email address"
            />
            <button disabled={sending}>
                {sending ? "Subscribing…" : "Subscribe"}
            </button>
            <p role="status">{status}</p>
        </form>
    );
}
