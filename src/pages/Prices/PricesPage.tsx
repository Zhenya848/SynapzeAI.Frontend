import { Box, Button, Card, Divider, Stack, Typography } from "@mui/material";

export function PricesPage() {
    return (
        <div style={{display: "flex", gap: 100, padding: 100}}>
            <Card variant="outlined" sx={{ maxWidth: 360 }}>
                <Box sx={{ p: 2 }}>
                    <Stack
                    direction="row"
                    sx={{ justifyContent: 'space-between', alignItems: 'center' }}
                    >
                    <Typography gutterBottom variant="h5" component="div">
                        Базовая
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                        190₽ / месяц
                    </Typography>
                    </Stack>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        10 викторин с AI в месяц, возможность сохранять викторины других пользователей
                    </Typography>
                </Box>
                <Divider />
                <Box sx={{ p: 2 }}>
                    <Button variant="contained">
                        Приобрести
                    </Button>
                </Box>
            </Card>

            <Card variant="outlined" sx={{ maxWidth: 360 }}>
                <Box sx={{ p: 2 }}>
                    <Stack
                    direction="row"
                    sx={{ justifyContent: 'space-between', alignItems: 'center' }}
                    >
                    <Typography gutterBottom variant="h5" component="div">
                        Расширенная
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                        490₽ / месяц
                    </Typography>
                    </Stack>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        30 викторин с AI в месяц, возможность публиковать викторины, копировать ссылки на викторины
                        и смотреть историю прохождений
                    </Typography>
                </Box>
                <Divider />
                <Box sx={{ p: 2 }}>
                    <Button variant="contained">
                        Приобрести
                    </Button>
                </Box>
            </Card>

            <Card variant="outlined" sx={{ maxWidth: 360 }}>
                <Box sx={{ p: 2 }}>
                    <Stack
                        direction="row"
                        sx={{ justifyContent: 'space-between', alignItems: 'center', gap: 5 }}
                    >
                        <Typography gutterBottom variant="h5" component="div">
                            Продвинутая
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div">
                            990₽ / месяц
                        </Typography>
                    </Stack>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        безлимит на викторины
                    </Typography>
                </Box>
                <Divider />
                <Box sx={{ p: 2 }}>
                    <Button variant="contained">
                        Приобрести
                    </Button>
                </Box>
            </Card>
        </div>
    )
}