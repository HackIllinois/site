import { Box, Chip } from "@mui/material";

export type Tag = {
    id: string;
    label: string;
};

type TagProps = {
    tag: Tag;
};

export const Tag: React.FC<TagProps> = ({ tag }) => {
    return (
        <Box
            sx={{
                position: "relative",
                borderRadius: "132px",
                px: 2,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: 40,
                background: "#401A79",
                "&::before": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    borderRadius: "132px",
                    padding: "5px",
                    background:
                        "linear-gradient(90deg, #A315D6, #FDAB60, #A315D6)",
                    WebkitMask:
                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                    pointerEvents: "none"
                },
                color: "#FFFFFF",
                fontFamily: "'Tsukimi Rounded', sans-serif",
                fontWeight: "bold",
                fontSize: 14,
                whiteSpace: "nowrap"
            }}
        >
            {tag.label}
        </Box>
    );
};

type TagMobileProps = {
    points: string;
    eventType: string;
};

export const TagMobile: React.FC<TagMobileProps> = ({ points, eventType }) => {
    return (
        <Chip
            label={
                <Box
                    sx={{
                        display: "flex",
                        borderRadius: "16px",
                        overflow: "hidden"
                    }}
                >
                    {/* Left side: points */}
                    <span
                        style={{
                            backgroundColor: "#EDDBFF",
                            color: "black",
                            padding: "0.2em 0.7em",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontFamily: "'SF Pro Text', sans-serif",
                            fontWeight: "medium",
                            fontSize: "2.5vw"
                        }}
                    >
                        + {points}Pt
                    </span>

                    {/* Right side: event type */}
                    <span
                        style={{
                            backgroundColor: "#7551D1",
                            color: "white",
                            padding: "0.2em 0.7em",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontFamily: "'SF Pro Text', sans-serif",
                            fontWeight: "medium",
                            fontSize: "2.5vw"
                        }}
                    >
                        {eventType}
                    </span>
                </Box>
            }
            sx={{
                height: "auto",
                borderRadius: "16px",
                pr: "2vw",
                backgroundColor: "transparent",
                "& .MuiChip-label": {
                    padding: 0
                }
            }}
        />
    );
};

type TagToggleProps = {
    tag: Tag;
    active: boolean;
    onToggle: (tagId: string) => void;
};

const TagToggle: React.FC<TagToggleProps> = ({ tag, active, onToggle }) => {
    return (
        <Box
            onClick={() => onToggle(tag.id)}
            sx={{
                position: "relative",
                borderRadius: "132px",
                px: 3,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: 40,
                cursor: "pointer",
                fontFamily: "'Tsukimi Rounded', sans-serif",
                fontWeight: "bold",
                fontSize: 16,
                whiteSpace: "nowrap",

                background: active ? "#401A79" : "#767676",
                color: "#FFFFFF",

                "&::before": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    borderRadius: "132px",
                    padding: "5px",

                    background: active
                        ? "linear-gradient(90deg, #A315D6, #FDAB60, #A315D6)"
                        : "#C9C9C9",

                    WebkitMask:
                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                    pointerEvents: "none"
                },

                "&:hover": {
                    opacity: 0.85
                }
            }}
        >
            {tag.label}
        </Box>
    );
};

type TagsListProps = {
    tags: Tag[];
};

export const TagsList: React.FC<TagsListProps> = ({ tags }) => {
    if (!tags.length) return null;

    return (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {tags.map(t => (
                <Tag key={t.id} tag={t} />
            ))}
        </Box>
    );
};

type TagsToggleListProps = {
    tags: Tag[];
    selectedTagIds: string[];
    onToggleTag: (tagId: string) => void;
};

export const TagsToggleList: React.FC<TagsToggleListProps> = ({
    tags,
    selectedTagIds,
    onToggleTag
}) => {
    if (!tags.length) return null;

    return (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, p: 0, m: 0 }}>
            {tags.map(tag => (
                <TagToggle
                    key={tag.id}
                    tag={tag}
                    active={selectedTagIds.includes(tag.id)}
                    onToggle={onToggleTag}
                />
            ))}
        </Box>
    );
};
