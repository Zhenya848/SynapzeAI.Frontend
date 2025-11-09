export const getColor = (value: number) => {
    const startColor = { r: 139, g: 23, b: 28 };
    const endColor = { r: 23, g: 160, b: 35 };
    
    const r = Math.round(startColor.r + (endColor.r - startColor.r) * value);
    const g = Math.round(startColor.g + (endColor.g - startColor.g) * value);
    const b = Math.round(startColor.b + (endColor.b - startColor.b) * value);
    
    return `rgb(${r}, ${g}, ${b})`;
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