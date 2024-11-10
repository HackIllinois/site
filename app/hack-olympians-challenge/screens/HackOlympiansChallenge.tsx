import ShineButton from "@/components/ShineButton/ShineButton";
import styles from "./HackOlympiansChallenge.module.scss";

interface HackOlympiansChallengeProps {
    handleSuccess: () => void;
    handleFailure: () => void;
}

const HackOlympiansChallenge: React.FC<HackOlympiansChallengeProps> = ({
    handleSuccess,
    handleFailure
}) => {
    return (
        <div className={styles.container}>
            <h1>HackOlympians Challenge</h1>
            <p>
                1. Your hometown in the mystical realm being attacked by Alan
                the Dragon. You have been chosen to find a wizarding tribe to
                help your town.
                <br />
                <br />
                2. Click this button to retrieve your magical JWT token. You
                must use the same GitHub account you used to register to
                HackIllinois 
            </p>
            <p>
                1. Your hometown in the mystical realm being attacked by Alan
                the Dragon. You have been chosen to find a wizarding tribe to
                help your town.
                <br />
                <br />
                2. Click this button to retrieve your magical JWT token. You
                must use the same GitHub account you used to register to
                HackIllinois 
            </p>
            <p>
                1. Your hometown in the mystical realm being attacked by Alan
                the Dragon. You have been chosen to find a wizarding tribe to
                help your town.
                <br />
                <br />
                2. Click this button to retrieve your magical JWT token. You
                must use the same GitHub account you used to register to
                HackIllinois 
            </p>
            <p>
                1. Your hometown in the mystical realm being attacked by Alan
                the Dragon. You have been chosen to find a wizarding tribe to
                help your town.
                <br />
                <br />
                2. Click this button to retrieve your magical JWT token. You
                must use the same GitHub account you used to register to
                HackIllinois 
            </p>
            <p>
                1. Your hometown in the mystical realm being attacked by Alan
                the Dragon. You have been chosen to find a wizarding tribe to
                help your town.
                <br />
                <br />
                2. Click this button to retrieve your magical JWT token. You
                must use the same GitHub account you used to register to
                HackIllinois 
            </p>
            <p>
                1. Your hometown in the mystical realm being attacked by Alan
                the Dragon. You have been chosen to find a wizarding tribe to
                help your town.
                <br />
                <br />
                2. Click this button to retrieve your magical JWT token. You
                must use the same GitHub account you used to register to
                HackIllinois 
            </p>
            <p>
                1. Your hometown in the mystical realm being attacked by Alan
                the Dragon. You have been chosen to find a wizarding tribe to
                help your town.
                <br />
                <br />
                2. Click this button to retrieve your magical JWT token. You
                must use the same GitHub account you used to register to
                HackIllinois 
            </p>
            <p>
                1. Your hometown in the mystical realm being attacked by Alan
                the Dragon. You have been chosen to find a wizarding tribe to
                help your town.
                <br />
                <br />
                2. Click this button to retrieve your magical JWT token. You
                must use the same GitHub account you used to register to
                HackIllinois 
            </p>
            <p>
                1. Your hometown in the mystical realm being attacked by Alan
                the Dragon. You have been chosen to find a wizarding tribe to
                help your town.
                <br />
                <br />
                2. Click this button to retrieve your magical JWT token. You
                must use the same GitHub account you used to register to
                HackIllinois 
            </p>
            <p>
                1. Your hometown in the mystical realm being attacked by Alan
                the Dragon. You have been chosen to find a wizarding tribe to
                help your town.
                <br />
                <br />
                2. Click this button to retrieve your magical JWT token. You
                must use the same GitHub account you used to register to
                HackIllinois 
            </p>
            <p>
                1. Your hometown in the mystical realm being attacked by Alan
                the Dragon. You have been chosen to find a wizarding tribe to
                help your town.
                <br />
                <br />
                2. Click this button to retrieve your magical JWT token. You
                must use the same GitHub account you used to register to
                HackIllinois 
            </p>

            <ShineButton
                text="Fetch JWT"
                onClick={() => {
                    // TODO: Fetch the JWT
                }}
            />

            <div className={styles.links}>
                <p onClick={handleSuccess} className={styles.link}>
                    <a>Test success case</a>
                </p>
                <p onClick={handleFailure} className={styles.link}>
                    <a>Test failure case</a>
                </p>

                <p className={styles.link}>
                    <a href="/registration-type">Back to signup</a>
                </p>
            </div>
        </div>
    );
};

export default HackOlympiansChallenge;
