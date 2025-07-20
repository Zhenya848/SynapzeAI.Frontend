import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { styled } from '@mui/material/styles';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import ConstructionIcon from '@mui/icons-material/Construction';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import CloseIcon from '@mui/icons-material/Close';

const LargeDarkDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: '#2d2d2d',
    color: '#ffffff',
    borderRadius: '16px',
    minWidth: '600px',
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

const VibrantOptionButton = styled(Button)(({ theme }) => ({
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

const SelectionPanel = ({open, onClose, onOptionSelect}) => {
  return (
    <div>
      <LargeDarkDialog open={open} onClose={onClose}>
        <DialogTitle>Выберите способ создания теста</DialogTitle>
        <DialogContent>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-around',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}>
            <VibrantOptionButton
              onClick={() => onOptionSelect('ai')}
              startIcon={<AutoAwesomeMosaicIcon />}
              sx={{
                backgroundColor: '#4a148c',
                '&:hover': { backgroundColor: '#7b1fa2' },
              }}
            >
              С помощью AI
              <div style={{ 
                fontSize: '0.9rem',
                opacity: 0.8,
                marginTop: '8px',
                fontWeight: 'normal'
              }}>
                AI создаёт квиз сам по выбранной теме!
              </div>
            </VibrantOptionButton>
            
            <VibrantOptionButton
              onClick={() => onOptionSelect('ordinary')}
              startIcon={<ConstructionIcon />}
              sx={{
                backgroundColor: '#e65100',
                '&:hover': { backgroundColor: '#f57c00' },
              }}
            >
              Обычный
              <div style={{ 
                fontSize: '0.9rem',
                opacity: 0.8,
                marginTop: '8px',
                fontWeight: 'normal'
              }}>
                Стандартный квиз
              </div>
            </VibrantOptionButton>
            
            <VibrantOptionButton
              onClick={() => onOptionSelect('interval')}
              startIcon={<LibraryBooksIcon />}
              sx={{
                backgroundColor: '#00695c',
                '&:hover': { backgroundColor: '#00897b' },
              }}
            >
              С интервальными повторениями
              <div style={{ 
                fontSize: '0.9rem',
                opacity: 0.8,
                marginTop: '8px',
                fontWeight: 'normal'
              }}>
                Для глубокого запоминания иностранных слов, стран, формул и т.п.
              </div>
            </VibrantOptionButton>
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

export default SelectionPanel;