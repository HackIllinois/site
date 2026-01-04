import styles from "./EllipseHeader.module.scss";

export function EllipseHeader() {
    // Control variables for curved text spacing
    const firstCurveY = 220;
    const curveSpacing = 60; // Spacing for two-line version
    const curveSpacingSmall = 80; // Spacing for three-line version

    const secondCurveY = firstCurveY + curveSpacing;
    const thirdCurveY = firstCurveY + curveSpacingSmall * 2;

    return (
        <div className={styles.ellipseSection}>
            <img
                src="/travel/ellipse.svg"
                alt="Ellipse"
                className={styles.ellipseImage}
            />
            <svg
                className={styles.ellipseTextSvg}
                viewBox="0 0 1512 2101"
                preserveAspectRatio="xMidYMid meet"
            >
                <defs>
                    <path id="ellipseCurve" d="M 90,250 Q 756,-40 1412,250" />
                    <linearGradient
                        id="ellipseTextGradient"
                        x1="100%"
                        y1="0%"
                        x2="0%"
                        y2="0%"
                    >
                        <stop
                            offset="-19.46%"
                            style={{ stopColor: "#A315D6" }}
                        />
                        <stop offset="47.1%" style={{ stopColor: "#FDAB60" }} />
                        <stop
                            offset="109.92%"
                            style={{ stopColor: "#A315D6" }}
                        />
                    </linearGradient>
                </defs>
                <text
                    className={styles.ellipseTextPath}
                    style={{
                        fill: "url(#ellipseTextGradient)"
                    }}
                >
                    <textPath
                        href="#ellipseCurve"
                        startOffset="50%"
                        textAnchor="middle"
                    >
                        For HackIllinois 2026, we are excited to offer travel
                        reimbursements to qualifying attendees!
                    </textPath>
                </text>
            </svg>

            <svg
                className={styles.ellipseTextSvgMobile}
                viewBox="0 0 1512 2101"
                preserveAspectRatio="xMidYMid meet"
            >
                <defs>
                    <path
                        id="ellipseCurve1"
                        d={`M 90,${firstCurveY} Q 756,${firstCurveY - 260} 1412,${firstCurveY}`}
                    />
                    <path
                        id="ellipseCurve2"
                        d={`M 90,${secondCurveY} Q 756,${secondCurveY - 270} 1412,${secondCurveY}`}
                    />
                    <linearGradient
                        id="ellipseTextGradient2"
                        x1="100%"
                        y1="0%"
                        x2="0%"
                        y2="0%"
                    >
                        <stop
                            offset="-19.46%"
                            style={{ stopColor: "#A315D6" }}
                        />
                        <stop offset="47.1%" style={{ stopColor: "#FDAB60" }} />
                        <stop
                            offset="109.92%"
                            style={{ stopColor: "#A315D6" }}
                        />
                    </linearGradient>
                </defs>
                <text className={styles.ellipseTextPathMobile}>
                    <textPath
                        href="#ellipseCurve1"
                        startOffset="50%"
                        textAnchor="middle"
                        style={{
                            fill: "url(#ellipseTextGradient2)"
                        }}
                    >
                        For HackIllinois 2026, we are excited to offer
                    </textPath>
                </text>
                <text className={styles.ellipseTextPathMobile}>
                    <textPath
                        href="#ellipseCurve2"
                        startOffset="50%"
                        textAnchor="middle"
                        style={{
                            fill: "url(#ellipseTextGradient2)"
                        }}
                    >
                        travel reimbursements to qualifying attendees!
                    </textPath>
                </text>
            </svg>

            <svg
                className={styles.ellipseTextSvgSmall}
                viewBox="0 0 1512 2101"
                preserveAspectRatio="xMidYMid meet"
            >
                <defs>
                    <path
                        id="ellipseCurve1Small"
                        d={`M 90,${firstCurveY} Q 756,${firstCurveY - 260} 1412,${firstCurveY}`}
                    />
                    <path
                        id="ellipseCurve2Small"
                        d={`M 90,${firstCurveY + curveSpacingSmall} Q 756,${firstCurveY + curveSpacingSmall - 270} 1412,${firstCurveY + curveSpacingSmall}`}
                    />
                    <path
                        id="ellipseCurve3Small"
                        d={`M 90,${thirdCurveY} Q 756,${thirdCurveY - 280} 1412,${thirdCurveY}`}
                    />
                    <linearGradient
                        id="ellipseTextGradient3"
                        x1="100%"
                        y1="0%"
                        x2="0%"
                        y2="0%"
                    >
                        <stop
                            offset="-19.46%"
                            style={{ stopColor: "#A315D6" }}
                        />
                        <stop offset="47.1%" style={{ stopColor: "#FDAB60" }} />
                        <stop
                            offset="109.92%"
                            style={{ stopColor: "#A315D6" }}
                        />
                    </linearGradient>
                </defs>
                <text className={styles.ellipseTextPathMobile}>
                    <textPath
                        href="#ellipseCurve1Small"
                        startOffset="50%"
                        textAnchor="middle"
                        style={{
                            fill: "url(#ellipseTextGradient3)"
                        }}
                    >
                        For HackIllinois 2026, we are excited
                    </textPath>
                </text>
                <text className={styles.ellipseTextPathMobile}>
                    <textPath
                        href="#ellipseCurve2Small"
                        startOffset="50%"
                        textAnchor="middle"
                        style={{
                            fill: "url(#ellipseTextGradient3)"
                        }}
                    >
                        to offer travel reimbursements
                    </textPath>
                </text>
                <text className={styles.ellipseTextPathMobile}>
                    <textPath
                        href="#ellipseCurve3Small"
                        startOffset="50%"
                        textAnchor="middle"
                        style={{
                            fill: "url(#ellipseTextGradient3)"
                        }}
                    >
                        to qualifying attendees!
                    </textPath>
                </text>
            </svg>
        </div>
    );
}
