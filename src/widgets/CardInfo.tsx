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
                    fontSize: { xs: "15px", lg: "0.875rem" } // body2 по умолчанию, 11px на маленьких
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
                    fontSize: { xs: "15px", lg: "1.25rem" } // h6 по умолчанию (1.25rem), 11px на маленьких
                }}
                variant="h6"
            >
                {value}
            </Typography>
        </Box>
    );
}