import { Box, Button, colors } from "@mui/material";
import { useState } from "react";

interface IProgressBoxesInfo {
    totalQuestions: number, 
    errorBoxes?: number[]
    onChoose?: any,
}

const ProgressBoxes = ({totalQuestions = 4, errorBoxes, onChoose}: IProgressBoxesInfo) => {
    const [progress, setProgress] = useState<number[]>(Array(totalQuestions).fill(0));

    const updateProgress = (index: number, value: number) => {
        const newProgress = [...progress];
        newProgress[index] = Math.min(1, Math.max(0, value));
        setProgress(newProgress);
    };

    const getColor = (value: number) => {
        const hue = value * 120;
        return `hsl(${hue}, 70%, 50%)`;
    };

    const isErrorBox = (index: number) => {
        return errorBoxes?.includes(index + 1);
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

    const fillStyle = (value: number) => ({
        position: 'absolute' as const,
        bottom: 0,
        left: 0,
        width: '100%',
        height: `${value * 100}%`,
        backgroundColor: getColor(value),
        opacity: value > 0 ? 0.7 : 0.3,
        transition: 'all 0.3s ease',
        zIndex: 1
    });

    const buttonStyle = {
        padding: '5px 10px',
        cursor: 'pointer',
    };

    const numberStyle: React.CSSProperties = {
        position: 'relative',
        zIndex: 10,
        textShadow: '0 0 3px black',
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
                <button onClick={() => onChoose(index)} key={index} style={{...boxStyle(index), flexShrink: 0}}>
                    <span style={numberStyle}>{index + 1}</span>
                    <div style={fillStyle(value)} />
                </button>
            ))}

        </Box>
    );
}

export default ProgressBoxes;