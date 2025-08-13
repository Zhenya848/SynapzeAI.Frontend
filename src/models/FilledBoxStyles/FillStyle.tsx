const getColor = (value: number) => {
    const hue = value * 100;
    return `hsl(${hue}, 70%, 50%)`;
};

export const fillStyle = (value: number) => ({
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