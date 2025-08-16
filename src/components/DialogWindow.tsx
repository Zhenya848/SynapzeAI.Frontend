import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { styled } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';

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

interface IDialogWindowInfo {
    open: any,
    onClose: any,
    onConfirm: any,
    title: string,
    confirmText: string,
    cancelText: string,
    dialogContentChildren: React.ReactNode,
    confirmButtonColor?: string,
    confirmButtonBackgroundColor?: string,
    confirmButtonIcon?: React.ReactNode
}

export const DialogWindow = ({ 
  open, 
  onClose, 
  onConfirm,
  title,
  confirmText,
  cancelText,
  dialogContentChildren,
  confirmButtonColor = "#ffffff",
  confirmButtonBackgroundColor = "#808080",
  confirmButtonIcon = <CheckIcon />
}: IDialogWindowInfo) => {
  return (
    <DarkDialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ padding: '24px' }}>
        {dialogContentChildren}
      </DialogContent>
      <DialogActions sx={{ padding: '16px 24px', borderTop: '1px solid #444' }}>
        <CancelButton
          onClick={onClose}
          startIcon={<CancelIcon />}
        >
          {cancelText}
        </CancelButton>
            <Button
                onClick={() => {
                    onConfirm();
                    onClose();
                }}
                startIcon={confirmButtonIcon}
                sx={{
                    backgroundColor: confirmButtonBackgroundColor,
                    color: confirmButtonColor,
                    padding: '10px 24px',
                    fontSize: '1rem',
                    fontWeight: '500',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.2s ease'
                }}
                >
                {confirmText}
            </Button>
      </DialogActions>
    </DarkDialog>
  );
};