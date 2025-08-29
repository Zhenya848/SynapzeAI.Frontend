import { Box, Skeleton } from "@mui/material"

export const SolvingHistoryCardSkeleton = () => {
    return (
        <Box sx={{
            p: 1,
            borderRadius: 3,
            bgcolor: "#616161",
            margin: '20px',
            width: 'calc(100% - 40px)',
            boxSizing: 'border-box',
            textAlign: 'center'
        }}>
            <Skeleton 
                variant="text" 
                width="60%" 
                height={40} 
                sx={{ mx: 'auto', mb: 2 }}
            />
            
            <Skeleton 
                variant="text" 
                width="70%" 
                height={40} 
                sx={{ mx: 'auto', mb: 2 }}
            />
            
            <Skeleton 
                variant="text" 
                width="50%" 
                height={40} 
                sx={{ mx: 'auto', mb: 3 }}
            />

            <Box sx={{ 
                display: 'flex', 
                gap: 2, 
                marginTop: "20px", 
                width: '100%', 
                overflowX: "auto",
                pb: 1
            }}>
                {Array.from({ length: 5 }).map((_, index) => (
                    <Box
                        key={index}
                        sx={{
                            minWidth: 300,
                            p: 2,
                            borderRadius: 2,
                            bgcolor: 'grey.600',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2
                        }}
                    >
                        <Skeleton variant="text" width="80%" height={30} />
                        
                        <Skeleton variant="text" width="90%" height={20} />
                        <Skeleton variant="text" width="70%" height={20} />
                        
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Skeleton variant="text" width="60%" height={25} />
                            <Skeleton variant="text" width="60%" height={25} />
                        </Box>
                        
                        <Skeleton variant="rounded" width="100%" height={60} />
                    </Box>
                ))}
            </Box>
        </Box>
    )
}