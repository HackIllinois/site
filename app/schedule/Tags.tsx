import { tag } from "@/app/schedule/page";
import { Box, Chip } from "@mui/material";

type TagsProps = {
    tags: tag[];
};

const Tags: React.FC<TagsProps> = ({ tags }) => {
    if (!tags.length) return null;

    return (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {tags.map((tag, index) => (
                <Chip
                    key={index}
                    label={tag.name}
                    sx={{
                        borderRadius: "132px",
                        border: "6px solid",
                        borderImageSlice: 1,
                        borderImageSource:
                            "linear-gradient(90deg, #A315D6, #FDAB60, #A315D6)",
                        backgroundColor: "transparent",
                        color: "#FFFFFF",
                        fontFamily: "'Tsukimi Rounded', sans-serif",
                        fontWeight: "bold",
                        fontSize: 20,
                        height: 40
                    }}
                />
            ))}
        </Box>
    );
};

export default Tags;
