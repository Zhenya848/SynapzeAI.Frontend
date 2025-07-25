import { Button, styled } from "@mui/material";

export const VibrantOptionButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(2),
  padding: theme.spacing(3),
  minWidth: '180px',
  minHeight: '120px',
  fontSize: '1.1rem',
  fontWeight: '500',
  borderRadius: '12px',
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease',
  '& .MuiButton-startIcon': {
    marginBottom: theme.spacing(1),
    fontSize: '2.5rem',
  },
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
  },
}));
