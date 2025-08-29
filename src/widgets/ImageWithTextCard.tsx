import { Card, CardContent, CardMedia, Typography } from "@mui/material";

interface ImageWithTextCardProps {
    imageUrl: string;
    title: string;
    description: string;
  }

export function ImageWithTextCard ({ imageUrl, title, description } : ImageWithTextCardProps) {
    return (
        <Card sx={{ maxWidth: 400, margin: '10px' }}>
            <CardMedia
                component="img"
                height="140"
                image={imageUrl}
                alt={title}
            />
            
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
}