import styles from "./Navigation.module.scss";
import NavigationButton from "./NavigationButton";

const buttonNames: Array<[string, string]> = [
    ["Back", "Education"],
    ["Personal Info", "Experience"],
    ["Education", "Transportation"],
    ["Experience", "Review Info"],
    ["Transportation", "Submit"]
];

type NavigationProps = {
    index: number;
    handlePrevious: () => void;
    handleNext: () => void;
};

const Navigation: React.FC<NavigationProps> = ({
    index,
    handlePrevious,
    handleNext
}) => {
    return (
        <div className={styles.container}>
            <NavigationButton
                text={buttonNames[index][0]}
                onClick={handlePrevious}
            />
            <NavigationButton
                text={buttonNames[index][1]}
                onClick={handleNext}
                pointRight
            />
        </div>
    );
};

export default Navigation;
