import { Box, Button, Card, Divider, Stack, Typography } from "@mui/material";
import { useCreatePaymentMutation } from "../../features/payment/api";
import { toast } from "react-toastify";

export function PricesPage() {
    const [createPayment] = useCreatePaymentMutation();

    const handleCreatePayment = async (amount: number) => {
        try {
            const response = await createPayment({amount: amount}).unwrap();

            window.open(response.result!);
        }
        catch (error) {
            toast.error("Не удалось создать платеж");
            console.error(error);
        }
    }

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
                    <Button onClick={() => handleCreatePayment(0)} variant="contained">
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
                    <Button onClick={() => handleCreatePayment(0)} variant="contained">
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
                    <Button onClick={() => handleCreatePayment(0)} variant="contained">
                        Приобрести
                    </Button>
                </Box>
            </Card>
        </div>
    )
}