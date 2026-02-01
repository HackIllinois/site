import { tag } from "@/app/schedule/page";
import { Box } from "@mui/material";

type TagProps = {
    tag: tag;
};

export const Tag: React.FC<TagProps> = ({ tag }) => {
    return (
        <Box
            sx={{
                position: "relative",
                borderRadius: "132px",
                px: 3,
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
                fontSize: 16,
                whiteSpace: "nowrap"
            }}
        >
            {tag.name}
        </Box>
    );
};

type TagsListProps = {
    tags: tag[];
};

export const TagsList: React.FC<TagsListProps> = ({ tags }) => {
    if (!tags.length) return null;

    return (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {tags.map((t, index) => (
                <Tag key={index} tag={t} />
            ))}
        </Box>
    );
};
