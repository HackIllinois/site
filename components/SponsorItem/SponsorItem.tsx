import clsx from "clsx";
import styles from "./SponsorItem.module.scss";
import Image from "next/image";
import Link from "next/link";

type SponsorItemProps = {
    className?: string;
    sponsorType: "platinum" | "gold" | "silver" | "bronze";
    sponsor: string;
    sponsorSrc: string;
    link: string;
    width: number;
    height: number;
};

const SponsorItem: React.FC<SponsorItemProps> = ({
    className,
    sponsorType,
    sponsor,
    sponsorSrc,
    link,
    width,
    height
}) => {
    return (
        <Link href={link} target="blank" rel="noopener noreferrer">
            <div
                className={clsx(
                    className,
                    styles.container,
                    sponsorType == "platinum" && styles.platinum,
                    sponsorType == "gold" && styles.gold,
                    sponsorType == "silver" && styles.silver,
                    sponsorType == "bronze" && styles.bronze
                )}
            >
                <Image
                    src={sponsorSrc}
                    alt={sponsor}
                    width={width}
                    height={height}
                    className={styles.image}
                />
            </div>
        </Link>
    );
};

export default SponsorItem;
