"use client";
import { Box, Typography } from "@mui/material";
import PathPrize from "./PathPrize";
import TrackPrize from "./TrackPrize";
import { keyframes } from "@mui/system";
import { motion, Variants } from "framer-motion";

const Prizes: React.FC = () => {
    const MotionBox = motion(Box);

    const bob = keyframes`
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
    `;

    // 1. Container Variant: Controls the timing of the children
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                // Wait 0.3s, then start animating children with a 0.2s gap between each
                delayChildren: 0.3,
                staggerChildren: 0.1
            }
        }
    };

    // 2. Item Variant: The actual animation for each element (Fade In + Slide Up)
    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94] // Smooth ease-out
            }
        }
    };

    const twinkle = keyframes`
        0% {
            opacity: 0.15;
            filter: drop-shadow(0 0 3px rgba(255,255,255,0.3));
        }
        50% {
            opacity: 0.95;
            filter: drop-shadow(0 0 14px rgba(255,255,255,0.95));
        }
        100% {
            opacity: 0.15;
            filter: drop-shadow(0 0 3px rgba(255,255,255,0.3));
        }
    `;

    return (
        <Box
            sx={{
                width: "100%",
                minHeight: "100vh",
                bgcolor: "#020316"
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    minHeight: "100vh",
                    position: "relative",
                    overflow: "hidden",
                    backgroundImage: {
                        xs: 'url("/prizes/backgrounds/prizesbg.svg")'
                    },
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "top center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    pt: "100px",
                    pb: "200px"
                }}
            >
                <Box
                    aria-hidden
                    sx={{
                        position: "absolute",
                        inset: 0,
                        zIndex: 0,
                        pointerEvents: "none",

                        backgroundImage: 'url("/prizes/backgrounds/stars.svg")',
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "top center",

                        opacity: 0.4,
                        animation: `${twinkle} 8s ease-in-out infinite`
                    }}
                />

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <motion.div variants={itemVariants}>
                        <Box
                            sx={{
                                backgroundImage: `url("/prizes/rocket.svg")`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: {
                                    xs: "auto 150px",
                                    md: "auto 140px"
                                },
                                backgroundPosition: {
                                    xs: "right center",
                                    md: "center"
                                },
                                mr: { xs: 2, md: 0 },
                                pt: 8,
                                pb: 9,
                                width: "100vw"
                            }}
                        >
                            <motion.div variants={itemVariants}>
                                <Typography
                                    sx={{
                                        textAlign: "center"
                                    }}
                                >
                                    <Box
                                        component="span"
                                        sx={{
                                            background:
                                                "linear-gradient(270deg, #A315D6 -19.46%, #FDAB60 47.1%, #A315D6 109.92%)",
                                            WebkitBackgroundClip: "text",
                                            backgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                            color: "transparent",
                                            display: "inline-block",
                                            fontSize: {
                                                xs: "19px",
                                                sm: "25px"
                                            },
                                            fontWeight: 700,
                                            maxWidth: "55vw",
                                            ml: { xs: -15, md: 0 }
                                        }}
                                    >
                                        <Box
                                            component="span"
                                            sx={{
                                                display: {
                                                    xs: "none",
                                                    sm: "inline"
                                                }
                                            }}
                                        >
                                            This year{" "}
                                        </Box>
                                        HackIllinois has{" "}
                                        <Box
                                            component="span"
                                            sx={{
                                                fontSize: {
                                                    xs: "20px",
                                                    sm: "35px"
                                                }
                                            }}
                                        >
                                            $60K+
                                        </Box>{" "}
                                        in prizes!
                                    </Box>
                                </Typography>
                            </motion.div>
                        </Box>
                    </motion.div>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    style={{ width: "90%" }}
                >
                    <motion.div variants={itemVariants}>
                        <Typography
                            sx={{
                                textAlign: "center",
                                fontFamily: "Montserrat",
                                fontSize: "35px",
                                fontWeight: 700,
                                pt: "20px"
                            }}
                        >
                            <Box
                                component="span"
                                sx={{
                                    background:
                                        "linear-gradient(270deg, #A315D6 -19.46%, #FDAB60 47.1%, #A315D6 109.92%)",
                                    WebkitBackgroundClip: "text",
                                    backgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    color: "transparent",
                                    display: "inline-block",
                                    fontFamily: "Tsukimi Rounded",
                                    fontSize: "48px",
                                    fontWeight: 700
                                }}
                            >
                                PATH PRIZES
                            </Box>
                        </Typography>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Typography
                            sx={{
                                color: "#FFFFFF",
                                textAlign: "center",
                                fontFamily: "Montserrat",
                                fontSize: "20px",
                                fontWeight: 600
                            }}
                        >
                            Prizes are for each member except Best Voyagers Hack
                            & Best General Hack.
                        </Typography>
                    </motion.div>
                </motion.div>

                <MotionBox
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                        gap: "20px",
                        width: "90vw",
                        maxWidth: "1200px",
                        mx: "auto",
                        mt: "20px",
                        justifyItems: { xs: "center", sm: "center" },

                        "& > *": {
                            animation: `${bob} 1.8s ease-in-out infinite`,
                            willChange: "transform"
                        },
                        "& > *:nth-of-type(1)": { animationDelay: "0s" },
                        "& > *:nth-of-type(2)": { animationDelay: "0.15s" },
                        "& > *:nth-of-type(3)": { animationDelay: "0.30s" },
                        "& > *:nth-of-type(4)": { animationDelay: "0.45s" },
                        "& > *:nth-of-type(5)": { animationDelay: "0.60s" },
                        "& > *:nth-of-type(6)": { animationDelay: "0.75s" },
                        "& > *:nth-of-type(7)": { animationDelay: "0.90s" },
                        "& > *:nth-of-type(8)": { animationDelay: "1.05s" },
                        "& > *:nth-of-type(9)": { animationDelay: "1.20s" },
                        "& > *:nth-of-type(10)": { animationDelay: "1.35s" },
                        "& > *:nth-of-type(11)": { animationDelay: "1.5s" },
                        "& > *:nth-of-type(12)": { animationDelay: "1.65s" }
                    }}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <MotionBox variants={itemVariants}>
                        <PathPrize
                            backgroundSrc="/prizes/path_prizes/prize1.svg"
                            topText="BEST VOYAGERS HACK"
                            bottomText="$5000"
                            radius={100}
                            width={600}
                            height={600}
                            centerOffsetY={10}
                            bottomTextSize={40}
                            topTextOffset={40}
                            bottomTextOffset={65}
                            bottomLetterSpacing={4}
                            topGradientWord="VOYAGERS"
                            topGradient={{
                                from: "#A315D6",
                                mid: "#FDAB60",
                                to: "#A315D6"
                            }}
                        />
                    </MotionBox>

                    <MotionBox
                        variants={itemVariants}
                        sx={{ mt: { xs: "-100px", sm: "0px" } }}
                    >
                        <PathPrize
                            backgroundSrc="/prizes/path_prizes/prize2.svg"
                            topText="BEST GENERAL HACK"
                            bottomText="$2500"
                            radius={110}
                            width={580}
                            height={580}
                            centerOffsetY={10}
                            centerOffsetX={-10}
                            bottomTextSize={40}
                            topTextOffset={60}
                            bottomTextOffset={40}
                            bottomLetterSpacing={4}
                        />
                    </MotionBox>

                    <MotionBox
                        variants={itemVariants}
                        sx={{ mt: { xs: "-25px", sm: "0px" } }}
                    >
                        <PathPrize
                            backgroundSrc="/prizes/path_prizes/prize3.svg"
                            topText="BEST BEGINNER HACK"
                            bottomText="EPOMAKER Mechanical Keyboard"
                            radius={165}
                            width={410}
                            height={410}
                            centerOffsetY={8}
                            centerOffsetX={0}
                            bottomTextSize={30}
                            topTextOffset={50}
                            bottomTextOffset={50}
                            topTextSize={30}
                            showHelpIcon
                            helpAngleDeg={338}
                            helpSize={30}
                            helpRotationDeg={19}
                            helpTooltip="At least half of the members are first time hackers."
                        />
                    </MotionBox>

                    <MotionBox
                        variants={itemVariants}
                        sx={{ mt: { xs: "25px", sm: "0px" } }}
                    >
                        <PathPrize
                            backgroundSrc="/prizes/path_prizes/prize4.svg"
                            topText="BEST UI/UX DESIGN"
                            bottomText="FUJIFILM Camera Package"
                            radius={160}
                            width={430}
                            height={430}
                            centerOffsetY={12}
                            centerOffsetX={0}
                            bottomTextSize={30}
                            topTextOffset={50}
                            bottomTextOffset={50}
                            topTextSize={30}
                        />
                    </MotionBox>

                    <MotionBox
                        variants={itemVariants}
                        sx={{ mt: { xs: "-15px", sm: "0px" } }}
                    >
                        <PathPrize
                            backgroundSrc="/prizes/path_prizes/prize5.svg"
                            topText="BEST SOCIAL IMPACT"
                            secondText="MARSHALL Speaker +"
                            bottomText="$50 Donation to charity of choice"
                            radius={120}
                            width={580}
                            height={580}
                            centerOffsetY={10}
                            centerOffsetX={10}
                            bottomTextSize={20}
                            topTextOffset={40}
                            bottomTextOffset={56}
                            topTextSize={20}
                            showHelpIcon
                            helpAngleDeg={313}
                            helpSize={21}
                            helpRotationDeg={5}
                            helpTooltip="Recognizes the project that has the potential to create the most significant positive change or address a pressing societal issue. Whether through addressing environmental concerns, improving accessibility, or tackling social injustices, among many other possibilities, this category highlights projects that aim to make a tangible difference in the world."
                        />
                    </MotionBox>

                    <MotionBox
                        variants={itemVariants}
                        sx={{ mt: { xs: "-55px", sm: "10px" } }}
                    >
                        <PathPrize
                            backgroundSrc="/prizes/path_prizes/prize6.svg"
                            topText="MOST POPULAR"
                            bottomText="SONY Headphones"
                            radius={125}
                            width={590}
                            height={590}
                            centerOffsetY={8}
                            centerOffsetX={-6}
                            bottomTextSize={20}
                            topTextOffset={58}
                            bottomTextOffset={40}
                            topTextSize={20}
                            showHelpIcon
                            helpAngleDeg={330}
                            helpSize={20}
                            helpRotationDeg={15}
                            helpTooltip="Determined by attendee votes."
                        />
                    </MotionBox>

                    <MotionBox
                        variants={itemVariants}
                        sx={{ mt: { xs: "-15px", sm: "0px" } }}
                    >
                        <PathPrize
                            backgroundSrc="/prizes/path_prizes/prize7.svg"
                            topText="MOST CREATIVE"
                            bottomText="NINJA Coffee Machine"
                            radius={165}
                            width={410}
                            height={410}
                            centerOffsetY={10}
                            centerOffsetX={0}
                            bottomTextSize={30}
                            topTextOffset={45}
                            bottomTextOffset={50}
                            topTextSize={30}
                        />
                    </MotionBox>

                    <MotionBox
                        variants={itemVariants}
                        sx={{ mt: { xs: "30px", sm: "0px" } }}
                    >
                        <PathPrize
                            backgroundSrc="/prizes/path_prizes/prize8.svg"
                            topText="MOST USELESS"
                            bottomText="NERF gun + Walkie-Talkie"
                            radius={150}
                            width={470}
                            height={470}
                            centerOffsetY={-2}
                            centerOffsetX={9}
                            bottomTextSize={25}
                            topTextOffset={60}
                            bottomTextOffset={50}
                            topTextSize={25}
                            showHelpIcon
                            helpTooltip="Celebrates projects that are delightfully impractical — but still well-designed and fully functional. We’re not looking for broken demos or unfinished apps, but thoughtfully built projects that explore fun, novel, or whimsical ideas rather than serious real-world problems."
                            helpAngleDeg={333}
                            helpSize={28}
                            helpRotationDeg={15}
                        />
                    </MotionBox>

                    <MotionBox
                        variants={itemVariants}
                        sx={{ mt: { xs: "-15px", sm: "0px" } }}
                    >
                        <PathPrize
                            backgroundSrc="/prizes/path_prizes/prize10.svg"
                            topText="BEST USE OF OPENAI"
                            bottomText="5k OpenAI API credits"
                            radius={130}
                            width={540}
                            height={540}
                            centerOffsetY={10}
                            centerOffsetX={0}
                            bottomTextSize={25}
                            topTextOffset={50}
                            bottomTextOffset={50}
                            topTextSize={25}
                        />
                    </MotionBox>

                    <MotionBox
                        variants={itemVariants}
                        sx={{ mt: { xs: "-15px", sm: "0px" } }}
                    >
                        <PathPrize
                            backgroundSrc="/prizes/path_prizes/prize9.svg"
                            topText="Coming Soon"
                            bottomText="? ? ?"
                            radius={130}
                            width={540}
                            height={540}
                            centerOffsetY={10}
                            centerOffsetX={0}
                            bottomTextSize={25}
                            topTextOffset={50}
                            bottomTextOffset={50}
                            topTextSize={25}
                        />
                    </MotionBox>

                    <MotionBox
                        variants={itemVariants}
                        sx={{ mt: { xs: "-23px", sm: "0px" } }}
                    >
                        <PathPrize
                            backgroundSrc="/prizes/path_prizes/prize11.svg"
                            topText="BEST USE OF CLOUDFLARE"
                            bottomText="5k Cloudflare Credits"
                            radius={130}
                            width={540}
                            height={540}
                            centerOffsetY={10}
                            centerOffsetX={0}
                            bottomTextSize={25}
                            topTextOffset={50}
                            bottomTextOffset={50}
                            topTextSize={25}
                        />
                    </MotionBox>

                    <MotionBox
                        variants={itemVariants}
                        sx={{ mt: { xs: "-23px", sm: "0px" } }}
                    >
                        <PathPrize
                            backgroundSrc="/prizes/path_prizes/prize12.svg"
                            topText="BEST USE OF"
                            bottomText="SUPERMEMORY"
                            radius={130}
                            width={540}
                            height={540}
                            centerOffsetY={10}
                            centerOffsetX={0}
                            bottomTextSize={25}
                            topTextOffset={50}
                            bottomTextOffset={50}
                            topTextSize={25}
                        />
                    </MotionBox>
                </MotionBox>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    style={{ width: "90%" }}
                >
                    <motion.div variants={itemVariants}>
                        <Typography
                            sx={{
                                textAlign: "center",
                                fontFamily: "Montserrat",
                                fontSize: "30px",
                                fontWeight: 700,
                                pt: "60px"
                            }}
                        >
                            <Box
                                component="span"
                                sx={{
                                    background:
                                        "linear-gradient(270deg, #A315D6 -19.46%, #FDAB60 47.1%, #A315D6 109.92%)",
                                    WebkitBackgroundClip: "text",
                                    backgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    color: "transparent",
                                    display: "inline-block",
                                    fontFamily: "Tsukimi Rounded",
                                    fontSize: "48px",
                                    fontWeight: 700
                                }}
                            >
                                TRACK PRIZES
                            </Box>
                        </Typography>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Typography
                            sx={{
                                color: "#FFFFFF",
                                textAlign: "center",
                                fontFamily: "Montserrat",
                                fontSize: "20px",
                                fontWeight: 600,
                                width: "70%",
                                mx: "auto"
                            }}
                        >
                            Designed by our sponsors to provide a specialized
                            topic to center your project around. Each team can
                            only compete in{" "}
                            <span
                                style={{
                                    background:
                                        "linear-gradient(180deg, #A315D6 -19.46%, #FDAB60 47.1%, #A315D6 109.92%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    fontWeight: 700
                                }}
                            >
                                ONE
                            </span>{" "}
                            track.
                        </Typography>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <Typography
                            sx={{
                                color: "#FFFFFF",
                                textAlign: "center",
                                fontFamily: "Montserrat",
                                fontSize: "20px",
                                fontWeight: 600
                            }}
                        >
                            Each track winning team will also receive a{" "}
                            <span
                                style={{
                                    background:
                                        "linear-gradient(180deg, #A315D6 -19.46%, #FDAB60 47.1%, #A315D6 109.92%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    fontWeight: 700
                                }}
                            >
                                $2500
                            </span>{" "}
                            cash prize.
                        </Typography>
                    </motion.div>
                </motion.div>
                <MotionBox
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                        gap: "20px",
                        width: "90vw",
                        maxWidth: "1200px",
                        mx: "auto",
                        mt: "80px",
                        justifyItems: { xs: "center", sm: "center" },

                        "& > *": {
                            animation: `${bob} 1.8s ease-in-out infinite`,
                            willChange: "transform"
                        },
                        "& > *:nth-of-type(1)": { animationDelay: "0s" },
                        "& > *:nth-of-type(2)": { animationDelay: "0.15s" },
                        "& > *:nth-of-type(3)": { animationDelay: "0.30s" },
                        "& > *:nth-of-type(4)": { animationDelay: "0.45s" },
                        "& > *:nth-of-type(5)": { animationDelay: "0.60s" }
                    }}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <MotionBox variants={itemVariants}>
                        <TrackPrize
                            backgroundSrc="/prizes/track_prizes/track2.svg"
                            topText="BEST EXPOSED API"
                            bottomText="$2500 + TBD"
                            radiusX={200}
                            radiusY={150}
                            width={500}
                            height={500}
                            centerOffsetY={10}
                            centerOffsetX={13}
                            bottomTextSize={25}
                            topTextOffset={50}
                            bottomTextOffset={50}
                            topTextSize={25}
                        />
                    </MotionBox>

                    <MotionBox variants={itemVariants}>
                        <TrackPrize
                            backgroundSrc="/prizes/track_prizes/track3.svg"
                            topText="BEST AI INFERENCE"
                            bottomText="$2500 + TBD"
                            radiusX={200}
                            radiusY={150}
                            width={500}
                            height={500}
                            centerOffsetY={10}
                            centerOffsetX={13}
                            bottomTextSize={25}
                            topTextOffset={50}
                            bottomTextOffset={50}
                            topTextSize={25}
                        />
                    </MotionBox>

                    <MotionBox variants={itemVariants}>
                        <TrackPrize
                            backgroundSrc="/prizes/track_prizes/track1.svg"
                            topText="BEST HARDWARE HACK"
                            bottomText="$2500 + Elegoo hardware starter kit"
                            radiusX={200}
                            radiusY={150}
                            width={500}
                            height={500}
                            centerOffsetY={10}
                            centerOffsetX={13}
                            bottomTextSize={25}
                            topTextOffset={50}
                            bottomTextOffset={50}
                            topTextSize={25}
                        />
                    </MotionBox>

                    <MotionBox variants={itemVariants}>
                        <TrackPrize
                            backgroundSrc="/prizes/track_prizes/track6.svg"
                            topText="? ? ?"
                            bottomText="$2500 + TBD"
                            radiusX={200}
                            radiusY={150}
                            width={500}
                            height={500}
                            centerOffsetY={10}
                            centerOffsetX={13}
                            bottomTextSize={25}
                            topTextOffset={50}
                            bottomTextOffset={50}
                            topTextSize={25}
                        />
                    </MotionBox>

                    <MotionBox variants={itemVariants}>
                        <TrackPrize
                            backgroundSrc="/prizes/track_prizes/track4.svg"
                            topText="? ? ?"
                            bottomText="$2500 + TBD"
                            radiusX={200}
                            radiusY={150}
                            width={500}
                            height={500}
                            centerOffsetY={10}
                            centerOffsetX={13}
                            bottomTextSize={25}
                            topTextOffset={50}
                            bottomTextOffset={50}
                            topTextSize={25}
                        />
                    </MotionBox>

                    {/* <MotionBox
                        variants={itemVariants}
                        sx={{
                            gridColumn: { sm: "1/-1" },
                            justifySelf: "center"
                        }}
                    >
                        <TrackPrize
                            backgroundSrc="/prizes/track_prizes/track5.svg"
                            topText="[TRACK NAME]"
                            bottomText="[PRIZE]"
                            radiusX={200}
                            radiusY={150}
                            width={500}
                            height={500}
                            centerOffsetY={10}
                            centerOffsetX={13}
                            bottomTextSize={25}
                            topTextOffset={50}
                            bottomTextOffset={50}
                            topTextSize={25}
                        />
                    </MotionBox> */}
                </MotionBox>
            </Box>
        </Box>
    );
};

export default Prizes;
