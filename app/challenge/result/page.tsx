"use client";
import { Box, Button } from "@mui/material";
import Success from "./success/page";
import Failure from "./failure/page";
import { ChallengeResultEnum } from "@/util/types";

export default function ChallengeResult({
    success = ChallengeResultEnum.Invalid
}: {
    success: ChallengeResultEnum;
}) {
    return (
        <Box width="100vw" height="100vh">
            <Button
                variant="outlined"
                onClick={() => {
                    success = success == ChallengeResultEnum.Success ? 1 : 0;
                }}
                sx={{
                    position: "absolute",
                    bottom: 4,
                    right: 4
                }}
            >
                switch status
            </Button>
            {success == ChallengeResultEnum.Success && <Success />}
            {success == ChallengeResultEnum.Failure && <Failure />}
            {success == ChallengeResultEnum.Invalid && (
                <Box>Please complete the challenge</Box>
            )}
        </Box>
    );
}
