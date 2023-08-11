import React, { useState } from "react";
import Navbar from "components/Navbar";
import { subscribe } from "util/api";
import styles from "./styles.module.scss";
const validator = require('validator')

const Newsletter:React.FC = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubscription = async () => {
    if (!validator.isEmail(email)) {
      alert("Please enter a valid email address!");
    } else {
      console.log("sending request");
      subscribe("2024_attendee_interest", email);
      setEmail(""); // clear input field after submitting
      console.log("request complete");
    }
  };

  const handleKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubscription();
    }
  };

  return (
    <>
      <span>Interested? Join our newsletter: </span>
      <div>
        <input className={styles.input} type="email" name="email" placeholder="Email" value={email} onChange={handleEmailChange} onKeyDown={handleKeydown}></input> 
        <button className={styles.joinbutton} onClick={() => handleSubscription()}>Join</button>
      </div>
    </>
  );
}

export default Newsletter;