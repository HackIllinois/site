import { Box } from "@mui/material";

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
                py: 0,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: 40,
                maxWidth: { xs: "100px", md: "140px" },
                background: "#401A79",
                "&::before": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    borderRadius: "132px",
                    padding: { xs: "4px", md: "5px" },
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
                fontSize: { xs: 12, md: 14 },
                whiteSpace: "nowrap"
            }}
        >
            {tag.label}
        </Box>
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
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                justifyContent: "flex-end"
            }}
        >
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
