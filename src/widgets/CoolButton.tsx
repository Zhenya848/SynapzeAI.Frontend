import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

interface CoolButtonProps extends ButtonProps {
  customColor?: string;
  customHoverColor?: string;
}

export const CoolButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'customColor' && prop !== 'customHoverColor',
})<CoolButtonProps>(({ theme, customColor, customHoverColor }) => ({
  backgroundColor: customColor || theme.palette.primary.main,
  color: '#ffffff',
  padding: '10px 24px',
  fontSize: '1rem',
  fontWeight: '500',
  '&:hover': {
    backgroundColor: customHoverColor || theme.palette.primary.dark,
    transform: 'translateY(-2px)',
  },
  transition: 'all 0.2s ease',
  marginLeft: theme.spacing(2),
}));