import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

const LargeDarkDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: '#2d2d2d',
    color: '#ffffff',
    borderRadius: '16px',
    width: "100%",
    maxWidth: '800px',
  },
  '& .MuiDialogTitle-root': {
    borderBottom: '1px solid #444',
    padding: theme.spacing(3),
    fontSize: '1.5rem',
    fontWeight: '600',
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(4),
  },
}));

type Props = {
    children: React.ReactNode;
    onOpen: any;
    onClose: any;
    dialogTitle: string
}

export const SelectionPanelSkeleton = ({ children, onOpen, onClose, dialogTitle }: Props) => {
  return (
    <div>
      <LargeDarkDialog open={onOpen} onClose={onClose}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-around',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}>
            {children}
          </div>
        </DialogContent>
        <DialogActions sx={{ padding: '16px 24px' }}>
          <Button 
            onClick={onClose}
            startIcon={<CloseIcon />}
            sx={{ 
              color: '#bdbdbd',
              '&:hover': { color: '#ffffff' },
            }}
          >
            Закрыть
          </Button>
        </DialogActions>
      </LargeDarkDialog>
    </div>
  );
};