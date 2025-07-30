import { Box, colors } from "@mui/material";
import { textStyle } from "../models/FilledBoxStyles/TextStyle";
import { fillStyle } from "../models/FilledBoxStyles/FillStyle";

interface IProgressBoxesInfo {
    totalQuestions: number, 
    errorBoxes?: number[]
    onChoose?: any,
    progressValues?: number[]
}

const ProgressBoxes = ({totalQuestions = 4, errorBoxes, onChoose, progressValues}: IProgressBoxesInfo) => {
    const progress = (progressValues ?? Array(totalQuestions).fill(0));

    const isErrorBox = (index: number) => {
        return errorBoxes?.includes(index);
    };

    const boxStyle = (index: number) => ({
        position: 'relative' as const,
        width: '50px',
        height: '50px',
        border: isErrorBox(index) ? `2px solid ${colors.red[700]}` : '1px solid #999999',
        backgroundColor: isErrorBox(index) ? colors.red[100] : 'transparent',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        overflow: 'hidden',
        margin: "10px"
    });

    const buttonStyle = {
        padding: '5px 10px',
        cursor: 'pointer',
    };

    return (
        <Box component="section" sx={{ 
            p: 1, 
            borderRadius: 3, 
            bgcolor: "#616161",
            alignItems: "flex-start", 
            height: "86vh",
            minWidth: "88px",
            margin: "20px",
            whiteSpace: 'nowrap', 
            overflowX: 'hidden', 
            overflowY: "auto",
            '@media (max-width: 900px)': {
                overflowX: 'auto',
                overflowY: "hidden",
                height: "auto", 
                width: "100%",
                display: "flex",
                flexWrap: 'nowrap'
            },
        }}>
            {progress.map((value, index) => (
                <button onClick={() => {if (onChoose) onChoose(index)}} key={index} style={{...boxStyle(index), flexShrink: 0}}>
                    <span style={textStyle}>{index + 1}</span>
                    <div style={fillStyle(value)} />
                </button>
            ))}

        </Box>
    );
}

export default ProgressBoxes;