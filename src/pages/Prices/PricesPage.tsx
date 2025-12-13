import { Box, Button, Card, Divider, Stack, Typography } from "@mui/material";
import { useCreatePaymentMutation } from "../../features/payment/api";
import { toast } from "react-toastify";
import { PricingPlans } from "../../shared/Prices/PricingPlans";
import { useSetUser } from "../../shared/helpers/api/useSetUser";
import { useEffect } from "react";

export function PricesPage() {
    const setUser = useSetUser();
    const [createPayment] = useCreatePaymentMutation();

    useEffect(() => {
        setUser();
    }, [])

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
        <div style={{padding: 20, display: "flex", flexDirection: "column", alignItems: "center", width: "100%"}}>
            <Typography variant="h4">Тарифы пакетов</Typography>

            <div style={{display: "flex", gap: 100, marginTop: "50px", width: "100%", flexWrap: 'wrap', justifyContent: "center"}}>
                {PricingPlans.map((plan) => (
                    <Card variant="outlined" sx={{ width: 276 }}>
                        <Box sx={{ p: 2 }}>
                            <Stack
                            direction="row"
                            sx={{ justifyContent: 'space-between', alignItems: 'center', gap: 2 }}
                            >
                            <Typography gutterBottom variant="h5" component="div">
                                {plan.name}
                            </Typography>
                            <Typography gutterBottom variant="h6" component="div">
                                {plan.price}₽
                            </Typography>
                            </Stack>
                        </Box>
                        <Divider />
                        <Box sx={{ p: 2 }}>
                            <Button onClick={() => handleCreatePayment(plan.productId)} variant="contained">
                                Приобрести
                            </Button>
                        </Box>
                    </Card>
                ))}
            </div>
        </div>
    )
}