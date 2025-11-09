import { SelectionPanelSkeleton } from "../../../widgets/SelectionPanelSkeleton";
import { VibrantOptionButton } from "../../../shared/styles/VibrantOptionButton";
import ConstructionIcon from '@mui/icons-material/Construction';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';

interface StartDecideSelectionPanelProps {
    isOpen: boolean;
    onClose: () => void;
    onOptionSelect: (option: 'ordinaryMode' | 'intervalMode') => void;
}

const StartDecideSelectionPanel = ({isOpen: onOpen, onClose, onOptionSelect}: StartDecideSelectionPanelProps) => {
    return (
        <SelectionPanelSkeleton isOpen={onOpen} onClose={onClose} dialogTitle="Выберите режим викторины">
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