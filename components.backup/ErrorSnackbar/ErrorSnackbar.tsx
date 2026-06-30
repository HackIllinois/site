import { Alert, Snackbar } from "@mui/material";

interface ErrorSnackbarProps {
    open: boolean;
    onClose: () => void;
    message: string;
    anchorOrigin?: {
        vertical: "top" | "bottom";
        horizontal: "left" | "center" | "right";
    };
}

export default function ErrorSnackbar({
    open,
    onClose,
    message,
    anchorOrigin = { vertical: "top", horizontal: "center" }
}: ErrorSnackbarProps) {
    return (
        <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={onClose}
            anchorOrigin={anchorOrigin}
        >
            <Alert onClose={onClose} severity="error" sx={{ width: "100%" }}>
                {message}
            </Alert>
        </Snackbar>
    );
}
