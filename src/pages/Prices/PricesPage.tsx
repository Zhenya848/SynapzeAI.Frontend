import { Box, Button, Card, Divider, Stack, Typography } from "@mui/material";
import { useCreatePaymentMutation } from "../../features/payment/api";
import { toast } from "react-toastify";

export function PricesPage() {
    const [createPayment] = useCreatePaymentMutation();

    const handleCreatePayment = async (productId: string) => {
        try {
            const response = await createPayment({productId: productId}).unwrap();

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
                        Базовый пакет
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                        190₽
                    </Typography>
                    </Stack>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        10 викторин
                    </Typography>
                </Box>
                <Divider />
                <Box sx={{ p: 2 }}>
                    <Button onClick={() => handleCreatePayment("10_generations")} variant="contained">
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
                        490₽
                    </Typography>
                    </Stack>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        30 викторин
                    </Typography>
                </Box>
                <Divider />
                <Box sx={{ p: 2 }}>
                    <Button onClick={() => handleCreatePayment("30_generations")} variant="contained">
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
                            990₽
                        </Typography>
                    </Stack>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        50 викторин
                    </Typography>
                </Box>
                <Divider />
                <Box sx={{ p: 2 }}>
                    <Button onClick={() => handleCreatePayment("50_generations")} variant="contained">
                        Приобрести
                    </Button>
                </Box>
            </Card>
        </div>
    )
}