"use client";
import { Box, Typography } from "@mui/material";
import PathPrize from "./PathPrize";
import TrackPrize from "./TrackPrize";

const Prizes: React.FC = () => {
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
                    backgroundImage: {
                        xs: 'url("/prizes/backgrounds/prizesbg.svg")'
                    },
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "top center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    pt: "200px",
                    pb: "200px"
                }}
            >
                <Typography
                    sx={{
                        color: "#FFF",
                        textAlign: "center",
                        textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                        fontFamily: "Tsukimi Rounded",
                        fontSize: "48px",
                        fontWeight: 700
                    }}
                >
                    PRIZES
                </Typography>

                <Typography
                    sx={{
                        color: "#FFFFFF",
                        textAlign: "center",
                        fontFamily: "Montserrat",
                        fontSize: "20px",
                        fontWeight: 600,
                        mt: "10px",
                        maxWidth: "90%"
                    }}
                >
                    Earn merch, swag, and prize money in the thousands!
                </Typography>

                <Typography
                    sx={{
                        textAlign: "center",
                        fontFamily: "Montserrat",
                        fontSize: "30px",
                        fontStyle: "normal",
                        fontWeight: 700,
                        background:
                            "linear-gradient(270deg, #A315D6 -19.46%, #FDAB60 47.1%, #A315D6 109.92%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        pt: "60px"
                    }}
                >
                    PATH PRIZES
                </Typography>

                <Typography
                    sx={{
                        color: "#FFFFFF",
                        textAlign: "center",
                        fontFamily: "Montserrat",
                        fontSize: "20px",
                        fontWeight: 400,
                        maxWidth: "90%"
                    }}
                >
                    Prizes are for each member except Best Voyagers Hack & Best
                    General Hack.
                </Typography>

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "90vw", sm: "45vw 45vw" },
                        gap: "20px",
                        width: "90vw",
                        mt: "60px",
                        justifyItems: { xs: "center", sm: "center" }
                    }}
                >
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

                    <Box sx={{ mt: { xs: "-100px", sm: "0px" } }}>
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
                    </Box>

                    <Box sx={{ mt: { xs: "-25px", sm: "0px" } }}>
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
                    </Box>

                    <Box sx={{ mt: { xs: "25px", sm: "0px" } }}>
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
                    </Box>

                    <Box sx={{ mt: { xs: "-15px", sm: "0px" } }}>
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
                    </Box>

                    <Box sx={{ mt: { xs: "-55px", sm: "10px" } }}>
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
                    </Box>

                    <Box sx={{ mt: { xs: "-15px", sm: "0px" } }}>
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
                    </Box>

                    <Box sx={{ mt: { xs: "30px", sm: "0px" } }}>
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
                    </Box>
                </Box>

                <Typography
                    sx={{
                        textAlign: "center",
                        fontFamily: "Montserrat",
                        fontSize: "30px",
                        fontStyle: "normal",
                        fontWeight: 700,
                        background:
                            "linear-gradient(270deg, #A315D6 -19.46%, #FDAB60 47.1%, #A315D6 109.92%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        pt: "60px"
                    }}
                >
                    TRACK PRIZES
                </Typography>

                <Typography
                    sx={{
                        color: "#FFFFFF",
                        textAlign: "center",
                        fontFamily: "Montserrat",
                        fontSize: "20px",
                        fontWeight: 400,
                        maxWidth: "90%"
                    }}
                >
                    Designed by our sponsors to provide a specialized topic to
                    center your project around.
                </Typography>

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "85vw", sm: "1fr 1fr" },
                        gap: "20px",
                        width: "90%",
                        mt: "80px",
                        justifyItems: "center"
                    }}
                >
                    <TrackPrize
                        backgroundSrc="/prizes/track_prizes/track1.svg"
                        topText="BEST USE OF CLOUDFLARE"
                        bottomText="5k Cloudflare Credits"
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

                    <TrackPrize
                        backgroundSrc="/prizes/track_prizes/track2.svg"
                        topText="BEST USE OF OPENAI"
                        bottomText="5k OpenAI Credits"
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

                    <TrackPrize
                        backgroundSrc="/prizes/track_prizes/track3.svg"
                        topText="BEST HARDWARE HACK"
                        bottomText="Elegoo Hardware Starter Kit"
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

                    <TrackPrize
                        backgroundSrc="/prizes/track_prizes/track4.svg"
                        topText="BEST USE OF SUPERMEMORY"
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
                </Box>

                <Box
                    sx={{
                        display: { xs: "grid", sm: "" },
                        gridTemplateColumns: { xs: "85vw", sm: "90vw" },
                        justifyItems: "center",
                        width: "90%",
                        mt: "20px"
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
                </Box>
            </Box>
        </Box>
    );
};

export default Prizes;
