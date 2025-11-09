import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import { styled } from '@mui/material/styles';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const DarkDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: '#2d2d2d',
    color: '#ffffff',
    borderRadius: '16px',
    width: "100%",
    maxWidth: '450px',
  },
  '& .MuiDialogTitle-root': {
    borderBottom: '1px solid #444',
    padding: theme.spacing(3),
    fontSize: '1.3rem',
    fontWeight: '500',
  },
}));

const ContinueButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#228B22',
  color: '#ffffff',
  padding: '10px 24px',
  fontSize: '1rem',
  fontWeight: '500',
  '&:hover': {
    backgroundColor: '#2E8B57',
    transform: 'translateY(-2px)',
  },
  transition: 'all 0.2s ease',
  marginLeft: theme.spacing(2),
}));

interface PauseDialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  confirmText?: string;
}

export const PauseDialog = ({ 
  open, 
  onClose,
  title = "Прохождение на паузе",
  confirmText = "Продолжить"
}: PauseDialogProps) => {
  return (
    <DarkDialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogActions sx={{ padding: '16px 24px', borderTop: '1px solid #444', justifyContent: "center" }}>
        <ContinueButton
          onClick={() => {
            onClose();
          }}
          startIcon={<ArrowRightIcon />}
        >
          {confirmText}
        </ContinueButton>
      </DialogActions>
    </DarkDialog>
  );
};