import Image from "next/image";
import LOGO from "@/public/home/olympian/logo.svg";
import BACKGROUND from "@/public/home/olympian/background.svg";
import OlympianButton from "@/components/OlympianButton/OlympianButton";
import Description from "../Description/Description";

const Hero: React.FC = () => {
    return (
        <section>
            <div>
                <Image alt="HackOlympus Logo" src={LOGO} />
                <OlympianButton
                    text="Register Now"
                    link="/register"
                    bottomPadding
                />
            </div>
            <Image alt="background" src={BACKGROUND} />
            <Description />
        </section>
    );
};

export default Hero;
