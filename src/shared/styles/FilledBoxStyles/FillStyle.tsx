export const getColor = (value: number, brightness: number = 1) => {
    const startColor = { r: 139, g: 23, b: 28 };
    const endColor = { r: 23, g: 160, b: 35 };
    
    const r = Math.round(startColor.r + (endColor.r - startColor.r) * value);
    const g = Math.round(startColor.g + (endColor.g - startColor.g) * value);
    const b = Math.round(startColor.b + (endColor.b - startColor.b) * value);
    
    const adjustBrightness = (color: number) => {
        return Math.round(Math.min(255, Math.max(0, color * brightness)));
    };
    
    return `rgb(${adjustBrightness(r)}, ${adjustBrightness(g)}, ${adjustBrightness(b)})`;
};

export const fillStyle = (value: number, brightness: number = 1) => ({
    position: 'absolute' as const,
    bottom: 0,
    left: 0,
    width: '100%',
    height: `${value * 100}%`,
    backgroundColor: getColor(value, brightness),
    opacity: value > 0 ? 0.7 : 0.3,
    transition: 'all 0.3s ease',
    zIndex: 1
});