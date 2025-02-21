import { Typography } from "@mui/material";

interface ICardInfo {
    title: string,
    value: string
}

export function CardInfo({title, value}: ICardInfo)
{
    return (
        <div>
            <Typography style={{color: "lightgrey"}}>{title + ":"}</Typography>
            <Typography variant="h6">{value}</Typography>
        </div>
    );
}