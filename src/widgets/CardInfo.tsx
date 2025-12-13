import { Box, Typography } from "@mui/material";

interface ICardInfo {
    title: string;
    value: string;
}

export function CardInfo({title, value}: ICardInfo) {
    return (
        <Box sx={{
            maxWidth: '97%'
        }}>
            <Typography 
                component="div" 
                sx={{ 
                    color: "lightgrey", 
                    whiteSpace: 'nowrap',
                    fontSize: { xs: "15px", lg: "0.875rem" }
                }}
            >
                {title}
            </Typography>
            <Typography 
                component="div"
                sx={{
                    whiteSpace: 'pre-line',
                    wordBreak: 'break-word',
                    overflowWrap: 'anywhere',
                    maxWidth: '100%',
                    fontSize: { xs: "15px", lg: "1.25rem" }
                }}
                variant="h6"
            >
                {value}
            </Typography>
        </Box>
    );
}