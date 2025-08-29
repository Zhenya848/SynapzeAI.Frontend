import { Box, Skeleton } from "@mui/material";
import { CardInfoSkeleton } from "../../../widgets/CardInfoSkeleton";

export const TestCardSkeleton = () => {
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
                    justifyContent: 'flex-end',
                    width: "100%",
                    '@media (max-width: 900px)': {
                        justifyContent: 'center',
                        marginTop: "20px"
                    },
                }}
            >
                <div style={{maxWidth:"250px", width: "100%", boxSizing: 'border-box'}}>
                    <p style={{textAlign: 'center'}}>
                        <Skeleton variant="rounded" width={180} height={40} />
                    </p>
                    <p style={{marginTop: "20px", textAlign: 'center'}}>
                        <Skeleton variant="rounded" width={150} height={36} />
                    </p>
                </div>

                <div style={{maxWidth:"250px", width: "100%", boxSizing: 'border-box'}}>
                    <p style={{textAlign: 'center'}}>
                        <Skeleton variant="rounded" width={160} height={40} />
                    </p>
                    <p style={{marginTop: "20px", textAlign: 'center'}}>
                        <Skeleton variant="rounded" width={140} height={36} />
                    </p>
                </div>
            </Box>

            <div style={{width: "auto", marginBottom: "110px"}}>
                <Skeleton variant="circular" width={40} height={40} />
            </div>
        </Box>
    )
}