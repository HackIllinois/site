"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Box, Typography, Button, TextField, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "./page.module.scss";

const Home: React.FC = () => {
    const [email, setEmail] = useState('');
    const router = useRouter();
    
    const handleRegisterClick = () => {
        router.push('/register');
    };
    
    const handleLearnMoreClick = () => {
        router.push('/challenge');
    };
    
    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            console.log('Subscribing email:', email);
            alert('Thank you for subscribing to HackVoyagers newsletter!');
            setEmail('');
        }
    };

    return (
        <main className={styles.main}>
            {/* Full Page Background */}
            <div className={styles.backgroundContainer}>
                <Image
                    src="/design-reference/entirebg.svg"
                    alt="HackVoyagers Page"
                    fill
                    className={styles.backgroundLayout}
                    priority
                />
                <Image
                    src="/backgrounds/first-mobile.svg"
                    alt="HackVoyagers Mobile Background"
                    fill
                    className={styles.mobileBackgroundLayout}
                    priority
                />
            </div>

            {/* Interactive Overlays - Position absolutely over background */}
            <div className={styles.interactiveOverlays}>
                
                {/* Hero Section */}
                <div className={styles.heroSection}>
                    <Image
                        src="/design-reference/fight.svg"
                        alt="Fight Background"
                        fill
                        className={styles.fightBackground}
                        priority
                    />
                    <Image
                        src="/design-reference/stars.svg"
                        alt="Stars Background"
                        fill
                        className={styles.starsBackground}
                        priority
                    />
                    <Image
                        src="/design-reference/tiny stars.svg"
                        alt="Tiny Stars Background"
                        fill
                        className={styles.tinyStarsBackground}
                        priority
                    />
                    <Image
                        src="/design-reference/hackastra.svg"
                        alt="Hackastra"
                        width={850}
                        height={267}
                        className={styles.hackastraLogo}
                        priority
                    />
                    <button 
                        className={styles.heroRegisterButton}
                        onClick={handleRegisterClick}
                        aria-label="Register Now"
                    >
                        <Image
                            src="/design-reference/register button.svg"
                            alt="Register Button"
                            width={300}
                            height={84}
                            className={styles.registerButtonImage}
                        />
                    </button>
                </div>

                {/* About Section */}
                <div className={styles.aboutSection}>
                    <Image
                        src="/design-reference/planets.svg"
                        alt="Planets Background"
                        fill
                        className={styles.planetsBackground}
                        priority
                    />
                    <Image
                        src="/design-reference/tiny stars.svg"
                        alt="Tiny Stars Background"
                        fill
                        className={styles.aboutTinyStarsBackground}
                        priority
                    />
                    <Box className={styles.aboutTextContainer}>
                        <Typography 
                            variant="h3" 
                            className={styles.aboutText}
                            sx={{
                                color: 'white',
                                textAlign: 'center',
                                fontWeight: 'bold',
                                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem' }
                            }}
                        >
                            About HackVoyagers
                        </Typography>
                        <Typography 
                            variant="body1" 
                            className={styles.aboutSubtext}
                            sx={{
                                color: 'white',
                                textAlign: 'center',
                                mt: 2,
                                fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem', lg: '1.2rem' }
                            }}
                        >
                            Join us for an exciting journey into the world of hacking and innovation. 
                            HackVoyagers brings together the brightest minds to solve challenges, 
                            learn new skills, and build amazing projects.
                        </Typography>
                    </Box>
                </div>

                {/* HackVoyagers Section */}
                <div className={styles.hackVoyagersSection}>
                    <Image
                        src="/design-reference/clouds.svg"
                        alt="Clouds Background"
                        fill
                        className={styles.cloudsBackground}
                        priority
                    />
                    <div className={styles.robotContainer}>
                        <Image
                            src="/design-reference/hackvoyagersrobotg.svg"
                            alt="HackVoyagers Robot"
                            width={500}
                            height={400}
                            className={styles.robotImage}
                        />
                    </div>
                    <div className={styles.textContainer}>
                        <Image
                            src="/design-reference/INTRODUCING.svg"
                            alt="Introducing"
                            width={400}
                            height={100}
                            className={styles.introducingText}
                        />
                        <Image
                            src="/design-reference/HACKVOYAGERS.svg"
                            alt="HackVoyagers"
                            width={600}
                            height={150}
                            className={styles.hackVoyagersText}
                        />
                        <button 
                            className={styles.learnMoreButton}
                            onClick={handleLearnMoreClick}
                            aria-label="Learn More"
                        >
                            <Image
                                src="/design-reference/voyagers button learn more.svg"
                                alt="Learn More Button"
                                width={180}
                                height={55}
                                className={styles.learnMoreButtonImage}
                            />
                        </button>
                    </div>
                </div>



                {/* Join Us Section */}
                <div className={styles.joinUsSection}>
                    <button 
                        className={styles.joinUsButton}
                        onClick={handleRegisterClick}
                        aria-label="Join Us"
                    />
                </div>

                {/* FAQ Section */}
                <div className={styles.faqSection}>
                    <Typography 
                        variant="h2" 
                        className={styles.faqTitle}
                        sx={{
                            color: 'white',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            mb: 4,
                            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.5rem' }
                        }}
                    >
                        Frequently Asked Questions
                    </Typography>
                    
                    <Box className={styles.faqContainer}>
                        <Accordion className={styles.faqItem}>
                            <AccordionSummary 
                                expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
                                sx={{ 
                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                    color: 'white',
                                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
                                }}
                            >
                                <Typography variant="h6">What is HackVoyagers?</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ backgroundColor: 'rgba(0,0,0,0.3)', color: 'white' }}>
                                <Typography>
                                    HackVoyagers is a hackathon event that brings together students and professionals 
                                    to innovate, learn, and create amazing projects over a weekend of coding and collaboration.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion className={styles.faqItem}>
                            <AccordionSummary 
                                expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
                                sx={{ 
                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                    color: 'white',
                                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
                                }}
                            >
                                <Typography variant="h6">Who can participate?</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ backgroundColor: 'rgba(0,0,0,0.3)', color: 'white' }}>
                                <Typography>
                                    Anyone with a passion for technology and innovation! Whether you're a beginner 
                                    or an experienced developer, designer, or idea generator, you're welcome to join.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion className={styles.faqItem}>
                            <AccordionSummary 
                                expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
                                sx={{ 
                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                    color: 'white',
                                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
                                }}
                            >
                                <Typography variant="h6">What should I bring?</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ backgroundColor: 'rgba(0,0,0,0.3)', color: 'white' }}>
                                <Typography>
                                    Bring your laptop, charger, and enthusiasm! We'll provide the workspace, 
                                    food, drinks, and mentorship to help you succeed.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                </div>

                {/* Stay Up To Date Section */}
                <div className={styles.stayUpToDateSection}>
                    <Typography 
                        variant="h2" 
                        className={styles.stayUpToDateTitle}
                        sx={{
                            color: 'white',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            mb: 3,
                            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.5rem' }
                        }}
                    >
                        Stay Up To Date
                    </Typography>
                    
                    <Box 
                        component="form" 
                        className={styles.newsletterForm}
                        onSubmit={handleSubscribe}
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            gap: 2,
                            justifyContent: 'center',
                            alignItems: 'center',
                            maxWidth: '500px',
                            mx: 'auto'
                        }}
                    >
                        <TextField
                            variant="outlined"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{
                                flex: 1,
                                width: { xs: '100%', sm: 'auto' },
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: 'rgba(255,255,255,0.9)',
                                    borderRadius: '50px',
                                    '& fieldset': { border: 'none' },
                                    '&:hover fieldset': { border: 'none' },
                                    '&.Mui-focused fieldset': { border: 'none' },
                                }
                            }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                borderRadius: '50px',
                                px: 4,
                                py: 2,
                                background: 'linear-gradient(45deg, #ff9dcc, #d0fdc9)',
                                color: 'black',
                                fontWeight: 'bold',
                                '&:hover': {
                                    background: 'linear-gradient(45deg, #ff7acc, #b0fcb9)',
                                }
                            }}
                        >
                            Subscribe
                        </Button>
                    </Box>
                </div>

            </div>
        </main>
    );
};

export default Home;