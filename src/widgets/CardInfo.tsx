import { Box, Typography } from "@mui/material";

interface ICardInfo {
    title: string;
    value: string;
}

export function CardInfo({title, value}: ICardInfo)
{
    return (
        <div>
            <Box sx={{
                    maxWidth: '97%'
                }}>
                    <Typography component="div" sx={{ color: "lightgrey", whiteSpace: 'nowrap' }}>
                        {title}
                    </Typography>
                    <Typography 
                        component="div"
                        sx={{
                            whiteSpace: 'pre-line',
                            wordBreak: 'break-word',
                            overflowWrap: 'anywhere',
                            maxWidth: '100%'
                        }}
                        variant="h6"
                    >
                        {value}
                    </Typography>
                </Box>
        </div>
    );
}