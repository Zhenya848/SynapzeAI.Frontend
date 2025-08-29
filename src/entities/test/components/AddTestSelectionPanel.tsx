import ConstructionIcon from '@mui/icons-material/Construction';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import { SelectionPanelSkeleton } from "../../../widgets/SelectionPanelSkeleton";
import { VibrantOptionButton } from "../../../shared/styles/VibrantOptionButton";

const AddTestSelectionPanel = ({onOpen, onClose, onOptionSelect}) => {
    return (
        <SelectionPanelSkeleton onOpen={onOpen} onClose={onClose} dialogTitle="Выберите способ создания викторины">
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
                AI создаёт викторину сам по выбранной теме!
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
              Кастомный
              <div style={{ 
                fontSize: '0.9rem',
                opacity: 0.8,
                marginTop: '8px',
                fontWeight: 'normal'
              }}>
                Создайте викторину своими руками!
              </div>
            </VibrantOptionButton>
        </SelectionPanelSkeleton>
    )
}

export default AddTestSelectionPanel;