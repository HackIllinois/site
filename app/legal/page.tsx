"use client";

import { useCallback, useEffect, useState } from "react";
import { Box, Typography, Tabs, Tab, Link as MuiLink } from "@mui/material";
import {
    DEFAULT_LEGAL_TAB,
    LEGAL_DOCS,
    isLegalTabId,
    type Block,
    type LegalDoc,
    type LegalTabId,
    type Rich
} from "./content";
import styles from "./legal.module.scss";

const FONT = "Montserrat, sans-serif";
const ACCENT_COLOR = "var(--footer-link)";
const LINK_SX = {
    color: ACCENT_COLOR,
    // MUI would otherwise underline in the theme's translucent white.
    textDecorationColor: "currentColor",
    fontWeight: 700,
    overflowWrap: "anywhere"
};
const BODY_SX = { fontFamily: FONT, lineHeight: 1.7 };

/** Reads `?tab=` so links (e.g. from registration) can open a specific tab. */
const readTabFromUrl = (): LegalTabId => {
    const tab = new URLSearchParams(window.location.search).get("tab");
    return isLegalTabId(tab) ? tab : DEFAULT_LEGAL_TAB;
};

type SelectTab = (tab: LegalTabId) => void;

function RichText({
    text,
    onSelectTab
}: {
    text: Rich;
    onSelectTab: SelectTab;
}) {
    if (typeof text === "string") return <>{text}</>;
    return (
        <>
            {text.map((part, i) => {
                if (typeof part === "string") return part;
                if ("href" in part) {
                    const external = !part.href.startsWith("mailto:");
                    return (
                        <MuiLink
                            key={i}
                            href={part.href}
                            sx={LINK_SX}
                            {...(external && {
                                target: "_blank",
                                rel: "noopener noreferrer"
                            })}
                        >
                            {part.text}
                        </MuiLink>
                    );
                }
                return (
                    <MuiLink
                        key={i}
                        href={`?tab=${part.tab}`}
                        onClick={(e: React.MouseEvent) => {
                            e.preventDefault();
                            onSelectTab(part.tab);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        sx={LINK_SX}
                    >
                        {part.text}
                    </MuiLink>
                );
            })}
        </>
    );
}

function LegalBlock({
    block,
    onSelectTab
}: {
    block: Block;
    onSelectTab: SelectTab;
}) {
    switch (block.type) {
        case "h2":
            return (
                <Typography
                    variant="h5"
                    component="h2"
                    sx={{
                        fontFamily: FONT,
                        fontWeight: 700,
                        fontSize: { xs: "1.2rem", md: "1.4rem" },
                        mt: 4,
                        mb: 1.5
                    }}
                >
                    {block.text}
                </Typography>
            );
        case "h3":
            return (
                <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                        fontFamily: FONT,
                        fontWeight: 700,
                        fontSize: { xs: "1rem", md: "1.1rem" },
                        mt: 2.5,
                        mb: 1
                    }}
                >
                    {block.text}
                </Typography>
            );
        case "p":
            return (
                <Typography sx={{ ...BODY_SX, mb: 1.5 }}>
                    <RichText text={block.text} onSelectTab={onSelectTab} />
                </Typography>
            );
        case "ul":
            return (
                <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                    {block.items.map((item, i) => (
                        <Typography
                            key={i}
                            component="li"
                            sx={{ ...BODY_SX, mb: 0.5 }}
                        >
                            <RichText text={item} onSelectTab={onSelectTab} />
                        </Typography>
                    ))}
                </Box>
            );
    }
}

function LegalDocument({
    doc,
    onSelectTab
}: {
    doc: LegalDoc;
    onSelectTab: SelectTab;
}) {
    return (
        <Box
            component="article"
            role="tabpanel"
            id={`legal-panel-${doc.id}`}
            aria-labelledby={`legal-tab-${doc.id}`}
        >
            <Typography
                variant="h4"
                component="h1"
                sx={{
                    fontFamily: FONT,
                    fontWeight: 700,
                    fontSize: { xs: "1.6rem", md: "2.125rem" },
                    mb: 1
                }}
            >
                {doc.title}
            </Typography>
            <Typography
                sx={{
                    fontFamily: FONT,
                    fontStyle: "italic",
                    color: "rgba(255, 255, 255, 0.75)",
                    mb: 3
                }}
            >
                {doc.description}
            </Typography>
            {doc.blocks.map((block, i) => (
                <LegalBlock key={i} block={block} onSelectTab={onSelectTab} />
            ))}
        </Box>
    );
}

const Legal: React.FC = () => {
    const [tab, setTab] = useState<LegalTabId>(DEFAULT_LEGAL_TAB);

    useEffect(() => {
        setTab(readTabFromUrl());
        const onPopState = () => setTab(readTabFromUrl());
        window.addEventListener("popstate", onPopState);
        return () => window.removeEventListener("popstate", onPopState);
    }, []);

    const selectTab = useCallback((next: LegalTabId) => {
        setTab(next);
        const url = new URL(window.location.href);
        url.searchParams.set("tab", next);
        window.history.replaceState(null, "", url);
    }, []);

    const doc = LEGAL_DOCS.find(d => d.id === tab) ?? LEGAL_DOCS[0];

    return (
        <>
            <div className={styles.background} aria-hidden="true" />
            <Box className={styles.panel}>
                <Tabs
                    value={tab}
                    onChange={(_, value: LegalTabId) => selectTab(value)}
                    variant="scrollable"
                    scrollButtons="auto"
                    allowScrollButtonsMobile
                    aria-label="Legal documents"
                    sx={{
                        mb: 4,
                        borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
                        "& .MuiTabs-indicator": {
                            backgroundColor: ACCENT_COLOR
                        },
                        "& .MuiTabs-scrollButtons": {
                            color: "white",
                            "&.Mui-disabled": { opacity: 0.3 }
                        },
                        "& .MuiTab-root": {
                            fontFamily: FONT,
                            color: "rgba(255, 255, 255, 0.75)",
                            textTransform: "none",
                            fontSize: { xs: "15px", md: "16px" },
                            px: { xs: 1.5, md: 2 },
                            "&.Mui-selected": {
                                color: "white",
                                fontWeight: 700
                            }
                        }
                    }}
                >
                    {LEGAL_DOCS.map(d => (
                        <Tab
                            key={d.id}
                            value={d.id}
                            label={d.label}
                            id={`legal-tab-${d.id}`}
                            aria-controls={`legal-panel-${d.id}`}
                        />
                    ))}
                </Tabs>
                <LegalDocument doc={doc} onSelectTab={selectTab} />
            </Box>
        </>
    );
};

export default Legal;
