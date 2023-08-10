import React, { useState } from "react";
import Navbar from "components/Navbar";
import { subscribe } from "util/api";
import styles from "./styles.module.scss";

const Newsletter:React.FC = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubscription = async () => {
    console.log("herereeeee");
    subscribe("2024_attendee_interest", email);
    console.log("out");
  };

  const handleKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubscription();
    }
  };

  return (
    <>
      <span>interested in attending? join our newsletter: </span>
      <div>
        <input className={styles.input} type="email" name="email" placeholder="email" value={email} onChange={handleEmailChange} onKeyDown={handleKeydown}></input> 
        <button className={styles.joinbutton} onClick={() => handleSubscription()}>join</button>
      </div>
    </>
  );
}

export default Newsletter;