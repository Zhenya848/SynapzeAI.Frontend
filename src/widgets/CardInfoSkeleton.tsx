import { Box, Skeleton } from "@mui/material"

export const CardInfoSkeleton = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Skeleton variant="text" width={120} height={20} />
            <Skeleton variant="text" width={150} height={24} />
        </Box>
    )
}