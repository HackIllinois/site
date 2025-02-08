import styles from "./CloseButton.module.scss";

const CloseButton = ({ handleClose }: { handleClose: () => void }) => {
    return (
        <button className={styles.button} onClick={handleClose}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24px 24px"
                width="24px"
                height="24px"
            >
                <path
                    fill="#ffffff"
                    d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
                ></path>
            </svg>
        </button>
    );
};

export default CloseButton;
