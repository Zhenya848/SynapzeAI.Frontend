import { Box, Typography } from "@mui/material";
import { getColor } from "../../../shared/styles/FilledBoxStyles/FillStyle";

interface IVerdictTaskCardInfo {
    nameCardInfo: string;
    message: string;

    userAnswer: string
    rightAnswer?: string;

    answers?: string[]

    comment?: string
    points?: number
}

function getBgColor(isRightAnswer: boolean | string | undefined, points: number | undefined) {
    const color = points ? getColor(points / 100) : "#787878";

    return isRightAnswer != undefined ? (isRightAnswer ? "#17a023" : "#8b171c") : color;
}

export function VerdictTaskCard({nameCardInfo, message, userAnswer, rightAnswer, answers, comment, points}: IVerdictTaskCardInfo) {
    const isRightAnswer = rightAnswer && userAnswer.toLocaleLowerCase() === rightAnswer.toLowerCase();

    return (
        <Box sx={{
            p: 2,
            borderRadius: 3,
            bgcolor: getBgColor(isRightAnswer, points),
            boxSizing: "border-box",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            containerType: "inline-size"
        }}>
            {rightAnswer && (
                <Typography 
                    sx={{ 
                        textAlign: 'center', 
                        mb: 1,
                        fontSize: "1.5rem",
                        "@container (max-width: 480px)": {
                            fontSize: "12px"
                        }
                    }}
                >
                    {userAnswer.toLocaleLowerCase() === rightAnswer.toLowerCase() ? "Верно!" : "Неверно!"}
                </Typography>
            )}

            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 2,
                flex: 1,
                minWidth: 0
            }}>
                {/* Название */}
                <Box sx={{ maxWidth: '97%' }}>
                    <Typography sx={{ 
                        color: "lightgrey", 
                        whiteSpace: 'nowrap', 
                        fontSize: "0.875rem",
                        "@container (max-width: 480px)": {
                            fontSize: "12px"
                        }
                    }}>
                        Название
                    </Typography>
                    <Typography sx={{ 
                        whiteSpace: 'pre-line', 
                        wordBreak: 'break-word', 
                        overflowWrap: 'anywhere', 
                        maxWidth: '100%', 
                        fontSize: "1.25rem",
                        "@container (max-width: 480px)": {
                            fontSize: "12px"
                        }
                    }}>
                        {nameCardInfo}
                    </Typography>
                </Box>

                {/* Сообщение */}
                <Box sx={{ maxWidth: '97%' }}>
                    <Typography sx={{ 
                        color: "lightgrey", 
                        whiteSpace: 'nowrap', 
                        fontSize: "0.875rem",
                        "@container (max-width: 480px)": {
                            fontSize: "12px"
                        }
                    }}>
                        Сообщение
                    </Typography>
                    <Typography sx={{ 
                        whiteSpace: 'pre-line', 
                        wordBreak: 'break-word', 
                        overflowWrap: 'anywhere', 
                        maxWidth: '100%', 
                        fontSize: "1.25rem",
                        "@container (max-width: 480px)": {
                            fontSize: "12px"
                        }
                    }}>
                        {message}
                    </Typography>
                </Box>

                {/* Варианты ответов */}
                {answers && answers.length > 0 && (
                    <Box sx={{ maxWidth: '97%' }}>
                        <Typography sx={{ 
                            color: "lightgrey", 
                            whiteSpace: 'nowrap', 
                            fontSize: "0.875rem",
                            "@container (max-width: 480px)": {
                                fontSize: "12px"
                            }
                        }}>
                            Варианты ответов
                        </Typography>
                        <Typography sx={{ 
                            whiteSpace: 'pre-line', 
                            wordBreak: 'break-word', 
                            overflowWrap: 'anywhere', 
                            maxWidth: '100%', 
                            fontSize: "1.25rem",
                            "@container (max-width: 480px)": {
                                fontSize: "12px"
                            }
                        }}>
                            {answers.join(", ")}
                        </Typography>
                    </Box>
                )}

                {/* Правильный ответ */}
                {rightAnswer && (
                    <Box sx={{ maxWidth: '97%' }}>
                        <Typography sx={{ 
                            color: "lightgrey", 
                            whiteSpace: 'nowrap', 
                            fontSize: "0.875rem",
                            "@container (max-width: 480px)": {
                                fontSize: "12px"
                            }
                        }}>
                            Правильный ответ
                        </Typography>
                        <Typography sx={{ 
                            whiteSpace: 'pre-line', 
                            wordBreak: 'break-word', 
                            overflowWrap: 'anywhere', 
                            maxWidth: '100%', 
                            fontSize: "1.25rem",
                            "@container (max-width: 480px)": {
                                fontSize: "12px"
                            }
                        }}>
                            {rightAnswer}
                        </Typography>
                    </Box>
                )}

                {/* Ответ пользователя */}
                <Box sx={{ maxWidth: '97%' }}>
                    <Typography sx={{ 
                        color: "lightgrey", 
                        whiteSpace: 'nowrap', 
                        fontSize: "0.875rem",
                        "@container (max-width: 480px)": {
                            fontSize: "12px"
                        }
                    }}>
                        Ответ пользователя
                    </Typography>
                    <Typography sx={{ 
                        whiteSpace: 'pre-line', 
                        wordBreak: 'break-word', 
                        overflowWrap: 'anywhere', 
                        maxWidth: '100%', 
                        fontSize: "1.25rem",
                        "@container (max-width: 480px)": {
                            fontSize: "12px"
                        }
                    }}>
                        {userAnswer}
                    </Typography>
                </Box>

                {/* Комментарий */}
                {comment && (
                    <Box sx={{ maxWidth: '97%' }}>
                        <Typography sx={{ 
                            color: "lightgrey", 
                            whiteSpace: 'nowrap', 
                            fontSize: "0.875rem",
                            "@container (max-width: 480px)": {
                                fontSize: "12px"
                            }
                        }}>
                            Комментарий к задаче
                        </Typography>
                        <Typography sx={{ 
                            whiteSpace: 'pre-line', 
                            wordBreak: 'break-word', 
                            overflowWrap: 'anywhere', 
                            maxWidth: '100%', 
                            fontSize: "1.25rem",
                            "@container (max-width: 480px)": {
                                fontSize: "12px"
                            }
                        }}>
                            {comment}
                        </Typography>
                    </Box>
                )}

                {/* Правильность ответа */}
                {points != null && (
                    <Box sx={{ maxWidth: '97%' }}>
                        <Typography sx={{ 
                            color: "lightgrey", 
                            whiteSpace: 'nowrap', 
                            fontSize: "0.875rem",
                            "@container (max-width: 480px)": {
                                fontSize: "12px"
                            }
                        }}>
                            Правильность ответа
                        </Typography>
                        <Typography sx={{ 
                            whiteSpace: 'pre-line', 
                            wordBreak: 'break-word', 
                            overflowWrap: 'anywhere', 
                            maxWidth: '100%', 
                            fontSize: "1.25rem",
                            "@container (max-width: 480px)": {
                                fontSize: "12px"
                            }
                        }}>
                            {points.toString() + " / 100"}
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
}