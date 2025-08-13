import { SelectionPanelSkeleton } from "./SelectionPanelSkeleton";
import { VibrantOptionButton } from "./VibrantOptionButton";
import ConstructionIcon from '@mui/icons-material/Construction';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';

const StartDecideSelectionPanel = ({onOpen, onClose, onOptionSelect}) => {
    return (
        <SelectionPanelSkeleton onOpen={onOpen} onClose={onClose} dialogTitle="Выберите режим викторины">
            <VibrantOptionButton
              onClick={() => onOptionSelect('ordinaryMode')}
              startIcon={<AutoAwesomeMosaicIcon />}
              sx={{
                backgroundColor: '#4a148c',
                '&:hover': { backgroundColor: '#7b1fa2' },
              }}
            >
              Обычный режим
              <div style={{ 
                fontSize: '0.9rem',
                opacity: 0.8,
                marginTop: '8px',
                fontWeight: 'normal'
              }}>
                Задачи идут последовательно, не повторяясь
              </div>
            </VibrantOptionButton>
            
            <VibrantOptionButton
              onClick={() => onOptionSelect('intervalMode')}
              startIcon={<ConstructionIcon />}
              sx={{
                backgroundColor: '#e65100',
                '&:hover': { backgroundColor: '#f57c00' },
              }}
            >
              Режим: интервальное повторение
              <div style={{ 
                fontSize: '0.9rem',
                opacity: 0.8,
                marginTop: '8px',
                fontWeight: 'normal'
              }}>
                Задачи встречаются в зависимости от того, насколько "плохо" вы их помните
              </div>
            </VibrantOptionButton>
        </SelectionPanelSkeleton>
    )
}

export default StartDecideSelectionPanel;