import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';

const DarkDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: '#2d2d2d',
    color: '#ffffff',
    borderRadius: '16px',
    minWidth: '450px',
  },
  '& .MuiDialogTitle-root': {
    borderBottom: '1px solid #444',
    padding: theme.spacing(3),
    fontSize: '1.3rem',
    fontWeight: '500',
  },
}));

const DangerButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#d32f2f',
  color: '#ffffff',
  padding: '10px 24px',
  fontSize: '1rem',
  fontWeight: '500',
  '&:hover': {
    backgroundColor: '#b71c1c',
    transform: 'translateY(-2px)',
  },
  transition: 'all 0.2s ease',
  marginLeft: theme.spacing(2),
}));

const CancelButton = styled(Button)(({ theme }) => ({
  color: '#bdbdbd',
  padding: '10px 24px',
  fontSize: '1rem',
  fontWeight: '500',
  '&:hover': {
    color: '#ffffff',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
}));

export const ConfirmDialog = ({ 
  open, 
  onClose, 
  onConfirm,
  title = "Вы точно хотите удалить тест?",
  confirmText = "Удалить",
  cancelText = "Отмена"
}) => {
  return (
    <DarkDialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ padding: '24px' }}>
        <div style={{ fontSize: '1.1rem', marginBottom: '16px' }}>
          Это действие нельзя будет отменить
        </div>
      </DialogContent>
      <DialogActions sx={{ padding: '16px 24px', borderTop: '1px solid #444' }}>
        <CancelButton
          onClick={onClose}
          startIcon={<CancelIcon />}
        >
          {cancelText}
        </CancelButton>
        <DangerButton
          onClick={() => {
            onConfirm();
            onClose();
          }}
          startIcon={<DeleteIcon />}
        >
          {confirmText}
        </DangerButton>
      </DialogActions>
    </DarkDialog>
  );
};