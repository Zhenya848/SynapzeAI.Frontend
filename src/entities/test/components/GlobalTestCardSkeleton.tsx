import { Box, Skeleton } from "@mui/material";
import { CardInfoSkeleton } from "../../../widgets/CardInfoSkeleton";

export const GlobalTestCardSkeleton = () => {
    return (
        <Box 
            component="section" 
            sx={{ 
                p: 1, 
                borderRadius: 3, 
                bgcolor: "#616161", 
                marginTop: '20px', 
                alignItems: "center", 
                display: 'flex', 
                width: "calc(100% - 10px)", 
                margin: "5px",
                '@media (max-width: 900px)': {
                    flexDirection: "column"
                },
            }}
        >
            <Box sx={{display: 'flex', width: "100%", margin: "10px", marginLeft: "30px"}}>
                <div style={{width: "100%", boxSizing: 'border-box'}}>
                    <CardInfoSkeleton />
                    <div style={{marginTop: "20px"}}><CardInfoSkeleton /></div>
                </div>

                <div style={{boxSizing: 'border-box', width: "100%"}}>
                    <CardInfoSkeleton />
                    <div style={{marginTop: "20px"}}><CardInfoSkeleton /></div>
                </div>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: { xs: 'center' },
                    width: "100%",
                    marginTop: { xs: '20px', md: '0' }
                }}
            >
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    gap: 2,
                    maxWidth: 250,
                    width: '100%'
                }}>
                    <Skeleton variant="rounded" width={180} height={40} />
                    <Skeleton variant="rounded" width={150} height={36} />
                </Box>
            </Box>
        </Box>
    )
}