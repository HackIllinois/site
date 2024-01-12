// TODO - Implement Page
import styles from "./styles.module.scss";
import UpperCave from "@/public/registration/education/upper cave.svg";
import Header from "@/public/registration/education/demographics header 2.svg"
import Image from "next/image";
const Education = () => {
    return (
    <>
        <div className={styles.education}> 
            <Image src={UpperCave} alt="Upper Cave" className={styles.uppercave} />
        </div>
    </>
    );
};

export default Education;
